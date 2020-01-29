var path = require('path');
var ROOT = path.resolve(__dirname, '.');
var root = path.join.bind(path, ROOT);
var HtmlReporter = require('protractor-beautiful-reporter');
var url = 'http://localhost:4200/'; // This should be local webserver
// if (process.env.TRAVIS) {
//     url = 'http://yourdevelopmentserver'; // Change to your dev server
// }

require('ts-node/register');

exports.config = {
  baseUrl: url,
  specs: ['../src/components/**/*e2e.ts'],
  exclude: [],
  framework: 'jasmine2',
  resultJsonOutputFile: './result.json',
  allScriptsTimeout: 12000,
  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 40000
  },
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      // 'args': ['--disable-gpu', '--window-size=1600,1000'] // For hide tests: '--headless', '--disable-gpu', '--no-sandbox',
      args: ['--no-sandbox', '--disable-gpu', '--window-size=1600x1000']
    }
  },


  // multiCapabilities: [{
  //     'browserName': 'chrome',
  //     'chromeOptions': {
  //         'args': ['--disable-gpu', '--window-size=1600,1000'] //--headless'
  //     },
  //     specs: [
  //         './src/**/*.e2e.ts'
  //     ],
  // },
  // {
  //     'browserName': 'chrome',
  //     'chromeOptions': {
  //         'args': ['--disable-gpu', '--window-size=1600,1000'] //--headless'
  //     },
  //     specs: [
  //         './src/**/**.logged-e2e.ts',
  //     ],
  // }],

  onPrepare: function () {
    browser.driver.manage().window().maximize();
    browser.ignoreSynchronization = true;
    jasmine.getEnv().addReporter(new HtmlReporter({
      preserveDirectory: false,
      takeScreenShotsOnlyForFailedSpecs: true,
      screenshotsSubfolder: 'images',
      jsonsSubfolder: 'jsons',
      baseDirectory: 'reports-tmp',
      sortFunction: function sortFunction(a, b) {
        if (a.cachedBase === undefined) {
          var aTemp = a.description.split('|').reverse();
          a.cachedBase = aTemp.slice(0).slice(0,-1);
          a.cachedName = aTemp.slice(0).join('');
        };
        if (b.cachedBase === undefined) {
          var bTemp = b.description.split('|').reverse();
          b.cachedBase = bTemp.slice(0).slice(0,-1);
          b.cachedName = bTemp.slice(0).join('');
        };

        var firstBase = a.cachedBase;
        var secondBase = b.cachedBase;

        for (var i = 0; i < firstBase.length || i < secondBase.length; i++) {

          if (firstBase[i] === undefined) { return -1; }
          if (secondBase[i] === undefined) { return 1; }
          if (firstBase[i].localeCompare(secondBase[i]) === 0) { continue; }
          return firstBase[i].localeCompare(secondBase[i]);
        }

        var firstTimestamp = a.timestamp;
        var secondTimestamp = b.timestamp;

        if(firstTimestamp < secondTimestamp) return -1;
        else return 1;
      },

      pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
        var currentDate = new Date(),
          day = currentDate.getDate(),
          month = currentDate.getMonth() + 1,
          year = currentDate.getFullYear();

        var validDescriptions = descriptions.map(function (description) {
          return description.replace('/', '@');
        });

        return path.join(
          day + "-" + month + "-" + year,
          // capabilities.get('browserName'),
          validDescriptions.join('-'));
      }
    }).getJasmine2Reporter());

    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
  },

  params: {
    login: {
      email: 'demo@esanum.com',
      password: '229835aA'
    }
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true
};
