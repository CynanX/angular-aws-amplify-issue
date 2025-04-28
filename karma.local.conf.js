// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular', 'pact'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('karma-junit-reporter'),
            require('karma-sonarqube-unit-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('@pact-foundation/karma-pact')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './artifacts/coverage'),
            reporters: [
                {type: 'cobertura', subdir: 'report-cobertura'},
                {type: 'html', subdir: 'report-html'},
                {type: 'lcov', subdir: 'report-lcov'},
                {type: 'text-summary', subdir: 'text-summary'}
            ],
            fixWebpackSourcePaths: true,
        },
        junitReporter: {
            outputDir: './artifacts/reports',
            outputFile: 'junit-test-report.xml',
            useBrowserName: false
        },
        sonarQubeUnitReporter: {
            sonarQubeVersion: 'LATEST',
            outputFile: './artifacts/reports/ui-report.xml',
            overrideTestDescriptions: true,
            testPaths: ['./src'],
            testFilePattern: '.spec.ts',
            useBrowserName: false
        },
        proxies: {
            '/sample/': 'http://127.0.0.1:1234/sample/'
        },
        reporters: ['progress', 'kjhtml', 'junit', 'sonarqubeUnit'],
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222',
                ],
            }
        }, port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true
    });
    process.env.TZ = 'Europe/London';
};
