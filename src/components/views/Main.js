import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import DashboardContainer from '../containers/DashboardContainer';
import withTracker from '../../lib/withTracker';
import NotFound from './NotFound';

import dashboards from '../../config/dashboards.json';


export default () => (
    <main>
        <Switch>
            <Route exact path="/" component={withTracker(Home)} />
            {dashboards.map((dashboardMeta, index) => (
                <Route
                    key={index}
                    path={`/dashboard/${dashboardMeta.path}`}
                    render={props => {
                        const ThisDashboardContainer = () => (
                            <DashboardContainer
                                {...props}
                                source={dashboardMeta.source}
                            />
                        );
                        const Tracker = withTracker(ThisDashboardContainer);

                        return <Tracker {...props} />;
                    }}
                />
            ))}
            <Route component={NotFound} />
        </Switch>
    </main>
);
