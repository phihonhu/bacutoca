// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  getPageTimeout: 60000,
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://192.168.79.137:1234/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath: './e2e/reports/',
      takeScreenshots: true,
      takeScreenshotsOnlyOnFailures: true,
      fixedScreenshotName: true,
      filePrefix: 'index',
      fileName: 'E2E-REPORT',
      cleanDestination: true,
      showPassed: true
    })
    );
  }
};
