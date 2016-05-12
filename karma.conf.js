// Karma configuration

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angularLocalStorage/dist/angularLocalStorage.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/lodash/dist/lodash.min.js',
            'bower_components/notie/dist/notie.min.js',
            'app.js',
            'js/*.js',
            'contacts/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit'
        reporters: ['progress'],

        // web server port
        port: 9876,

        // cli runner port
        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: 'karma.LOG_ERROR',

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        plugins: [
            'karma-jasmine',
            'PhantomJS',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
        ],
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
