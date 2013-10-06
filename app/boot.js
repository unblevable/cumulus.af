requirejs.config({
    paths: {
        text: 'lib/text',
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone',

        models: 'models/',
        collections: 'collections/',
        views: 'views/',
        routers: 'routers/',
        templates: 'templates/'
    },
    shim: {
        underscore: {
            exports: '_'
        },

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },
    // urlArgs: 'bust=' + (new Date()).getTime()
});

require(['jquery', 'underscore', 'backbone', 'views/FrontPageView', 'routers/AppRouter'], function ($, _,Backbone, FrontPageView, AppRouter) {

    $(function () {
        var frontPageView = new FrontPageView();

        $('#container').append(FrontPageView.render().$el);

        // Tell Backbone that it's okay to monitor hashtag changes
        if (!Backbone.history.started) {
            Backbone.history.start({ pushState: true });
        }
    });
});
