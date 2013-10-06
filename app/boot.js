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
        _ = require('underscore'),
        Backbone = require('backbone'),
        FrontPage = require('models/FrontPage'),
        FrontPageView = require('views/FrontPageView'),
        AppRouter = require('routers/AppRouter');

        var frontPage = new FrontPage(),
            frontPageView = new FrontPageView();

        // Tell Backbone that it's okay to monitor hashtag changes
        if (!Backbone.history.started) {
            Backbone.history.start({ pushState: true });
        }

});
