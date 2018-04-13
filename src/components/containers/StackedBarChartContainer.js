import React from 'react';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

import '../views/css/StackedBarChart.css';


// Mostly a React conversion of Ali Almosawi's work at:
// https://github.com/mozilla/firefox-hardware-report/blob/master/js/main.js
export default class extends React.Component {
    constructor(props) {
        super(props);

        this.size = {
            width: 450,
            height: 90,
            xPaddingLeft: 0,
            xPaddingRight: 30,
            barYPosition: 15,
            barHeight: 22
        };

        this.colors = [
            '#2bacfb',
            '#f44d29',
            '#31d620',
            '#fd9213',
            '#fdb813',
            '#fdd413',
            '#fdf513',
            '#75cbff',
            '#454545',
            '#b4b4b4',
            '#f1f1f1',
        ];

        // Don't show arrows (since they'll be bigger than the bar) if they are
        // below this value threshold.
        this.arrowIgnoreThreshold = 0.04;
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        const xScale = scaleLinear().domain([0, 1])
                           .range([0, this.size.width - this.size.xPaddingRight]);

        // TODO: faux data is all the rage these days
        const data = {
            id: 0,
            name: 'Usage by OS',
            data: [
                {
                    id: 0,
                    name: 'Win 7',
                    value: 0.44
                },
                {
                    id: 1,
                    name: 'Win 10',
                    value: 0.37
                },
                {
                    id: 2,
                    name: 'Win 8.1',
                    value: 0.08
                },
                {
                    id: 3,
                    name: 'macOS',
                    value: 0.07
                },
                {
                    id: 4,
                    name: 'winXP',
                    value: 0.03
                }
            ]
        };

        const svg = select(`#id_${data.id}`).select('svg');
        const rects = svg.selectAll('rect.bar');
        let xMarker = 0;

        svg.attr('width', this.size.width)
           .attr('height', this.size.height);

        svg.attr('viewBox', `0 0 ${this.size.width} ${this.size.height}`)
           .attr('preserveAspectRatio', 'xMinYMin meet');


        rects.data(data.data).enter().append('rect')
            .attr('class', function(d) {
                return 'bar bar_' + d.id;
            })
            .attr('width', function(d) {
                return (d.value === undefined) ? xScale(0) :
                xScale(d.value).toFixed(1);
            })
            .attr('x', (d, i) => {
                if (d.value === undefined) d.value = 0;

                const myXMarker = xMarker;
                xMarker += d.value;

                //append circle
                svg.append('circle')
                    .attr('r', 8)
                    .attr('class', () => {
                        return 'bar-arrow bar-arrow_' + d.id;
                    })
                    .attr('cx', () => {
                        return this.size.xPaddingLeft + xScale(
                        myXMarker + ((xMarker - myXMarker) / 2));
                    })
                    .attr('cy', this.size.barYPosition + this.size.barHeight - 3)
                    .style('fill', () => this.colors[i])
                    .style('opacity', () => {
                        if (d.value < this.ignoreThreshold) return 0;
                    });

                //append text labels
                svg.append('text')
                    .attr('class', `bar-label bar-label_${d.id}`)
                    .attr('text-anchor', 'middle')
                    .attr('x', () => {
                        return this.size.xPaddingLeft + xScale(
                            myXMarker + ((xMarker - myXMarker) / 2));
                    })
                    .attr('y', this.size.barYPosition + this.size.barHeight + 22)
                    .text(`${d.name} (${Math.round(d.value * 100)}%)`)
                    .style('fill', '#000000');

                return this.size.xPaddingLeft + xScale(myXMarker);
            })
            .attr('y', this.size.barYPosition)
            .attr('height', this.size.barHeight)
            .style('fill', (d, i) => this.colors[i])
            // Until a bar is hovered or clicked, show the first item of the bar chart.
            .style('display', (d, i) => {
                if (i === 0) {
                    showBarItem(d);
                }
            })
            // Show the currently hovered or clicked bar's arrow and label.
            .on('mouseenter click', showBarItem);

        function showBarItem(item) {
            svg.selectAll('.bar-arrow').style('display', 'none');
            svg.selectAll('.bar-label').style('display', 'none');

            svg.select(`.bar-label_${item.id}`).style('display', 'inline');
            svg.select(`.bar-arrow_${item.id}`).style('display', 'inline');
        }
    }

    render() {
        // TODO: deal with id
        return (
            <div className="stacked" id="id_0"><svg /></div>
        );
    }
}
