define(function (require, exports, module) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        App = require('models/App');

    var AppRouter = Backbone.Router.extend({

        routes: {
            '/hello': 'showFrontPage',
            '/users/:username': 'showFilesPage',
            '/login': 'login',
            '/register': 'register'
        },

        // routing handlers
        showFrontPage: function () {
        },

        showFilesPage: function () {
        },

        login: function () {
        },

        register: function () {
        }
    });

    return AppRouter;
});
