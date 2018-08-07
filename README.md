Ensemble is the platform that powers the Firefox Public Data Report, a weekly
public report on the activity, behavior, and hardware configuration of Firefox
Desktop users.

Ensemble fetches data from
[ensemble-transposer](https://github.com/mozilla/ensemble-transposer), a JSON
server that adds metadata to the raw data hosted by Mozilla data engineers.

Ensemble is written in React with the help of the wonderful
[create-react-app](https://github.com/facebook/create-react-app) tool from
Facebook.

## Development

### Install

1. [Install Node and NPM](https://nodejs.org/en/download/)
2. Run `npm install`

### Run

Run `npm start`

### Test

To run Jest, Nightwatch, and ESLint tests locally, run `npm test`.

#### BrowserStack

Follow these steps to run Nightwatch tests against even more browsers and
operating systems using BrowserStack.

1. Sign up for a BrowserStack account which supports automated testing (for
   example, an Automate Pro account). Note that automated testing is not
   available with free accounts.
2. Follow the instructions in the *Live (using other browsers); Automate; App
   Automate* section of [this page](https://www.browserstack.com/local-testing)
   to download, install, and run the BrowserStackLocal executable.
    * BrowserStack tells users to use the command-line executable for automated
      testing, but you may actually have better luck using the GUI app, which is
      linked from the *Live* section.
3. [Start Ensemble](#Run)
4. Run `BSUSER=username BSKEY=key npm run test:nightwatch:browserstack`

If you get an error about local testing through BrowserStack not being
connected, wait about 30 seconds and try again. If it keeps happening, try
stopping and re-starting the BrowserStackLocal process.

### Analyze

To analyze the size of the JavaScript bundle that will be served, run `npm run
size`.

### Notes

#### Adding new pages

When adding a new page, be sure to update the `routes` object of *static.json*
accordingly. For example, if an */about* page is added, the following property
should be added to the `routes` object:

```javascript
"/about": "index.html"
```

If this is not done, the page will 404 on production.

We could use a wildcard in *static.json* to send all unknown paths to
*index.html*, but that would mean even non-existent paths would render
successfully and the server would never return a 404.