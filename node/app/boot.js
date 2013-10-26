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
    urlArgs: 'bust=' + (new Date()).getTime()
});

require(['jquery', 'underscore', 'backbone', 'views/FrontPageView', 'routers/AppRouter'], function ($, _,Backbone, FrontPageView, AppRouter) {

    $(function () {
        var frontPageView = new FrontPageView();
        $('body').append(frontPageView.render().$el);

        var appRouter = new AppRouter();
        appRouter.on('route:defaultRoute', function(actions) {
            this.route('route:defaultRoute', '/hello');
        })

        Backbone.history.start({ pushState: true });
        // Tell Backbone that it's okay to monitor hashtag changes
        // if (!Backbone.history.started) {
        //     Backbone.history.start({ pushState: true });
        // }
    });
});
