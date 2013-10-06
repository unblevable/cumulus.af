requirejs.config({
    paths: {
        text: 'lib/text',
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',

        models: 'models',
        collections: 'collections',
        views: 'views',
        routers: 'routers',
        templates: 'templates'
    },
    shim: {
        underscore: {
            exports: '_'
        },

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone',
        }
    },
    urlArgs: 'bust=' + (new Date().getTime()
});

requirejs(function (require, exports, module) {
    var $ = require('jquery'),
        FrontPage = ('models/FrontPage');
});
