'use strict';

module.exports = function(config) {

  config.set({
      basePath: './',
      files: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-aria/angular-aria.js',
          'bower_components/angular-cookies/angular-cookies.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/angular-sanitize/angular-sanitize.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-material/angular-material.js',
          'bower_components/d3/d3.js',
          'bower_components/nvd3/build/nv.d3.js',
          'bower_components/angular-nvd3/dist/angular-nvd3.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-material-data-table/dist/md-data-table.js',
          'bower_components/angular-translate/angular-translate.js',
          'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
          'app/app.modules.js',
          'app/app.constants.js',
          'app/**/*.component.js',
          'app/**/*.service.js',
          'app/**/*.filter.js',
          'app/**/*.directive.js',
          'app/**/*.spec.js'
      ],
    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-jasmine'
    ]
  });
};
