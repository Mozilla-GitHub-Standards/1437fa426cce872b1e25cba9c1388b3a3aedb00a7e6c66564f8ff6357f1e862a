module.exports = {
    before: browser => {
        browser.url(`${browser.launchUrl}/dashboard/usage-behavior`);
    },

    'Dashboard loads': browser => {
        browser.expect.element('#dashboard').to.be.present;
    },

    'Dashboard title is correct': browser => {
        browser.expect.element('#dashboard-title').text.to.be.equal('Usage Behavior');
    },

    'Chart titles and order are correct': browser => {
        browser.expect.element('#metric-wrapper-1 .mg-chart-title').text.to.be.equal('Top Languages');
        browser.expect.element('#metric-wrapper-2 .mg-chart-title').text.to.be.equal('Tracking Protection');
        browser.expect.element('#metric-wrapper-3 .mg-chart-title').text.to.be.equal('Has Add-on');
        browser.expect.element('#metric-wrapper-4 h3').text.to.be.equal('Top Add-ons');
    },
};
