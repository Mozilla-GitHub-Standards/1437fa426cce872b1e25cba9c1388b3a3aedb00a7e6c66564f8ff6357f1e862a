Ensemble is the platform that powers the Firefox Public Data Report, a weekly
public report on the activity, behavior, and hardware configuration of Firefox
Desktop users.

Ensemble fetches data from
[ensemble-transposer](https://github.com/mozilla/ensemble-transposer), a JSON
server that adds metadata to the raw data hosted by Mozilla data engineers.

Ensemble is written in React with the help of the wonderful
[create-react-app](https://github.com/facebook/create-react-app) tool from
Facebook.

## Run

### For development

Run `npm start`

Any of the environment variables in *.env* can be overridden. For example:

`REACT_APP_SITE_TITLE='Firefox Public Lore Report' npm start`

### In production

See the [create-react-app documentation on
deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment).

Any of the environment variables in *.env* can be overridden.

## Development

### Testing

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

### Analyzing

To analyze the size of the JavaScript bundle that will be served, run `npm run
size`.