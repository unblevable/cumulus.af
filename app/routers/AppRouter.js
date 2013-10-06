define(function (require, exports, module) {
    var _ = require('underscore'),
        Backbone = require('backbone'),
        App = require('models/App')

        SigninView = require('views/SigninView'),
        SignupView = require('views/SignupView');

    var AppRouter = Backbone.Router.extend({

        routes: {
            'hello': 'showFrontPage',
            'users/:username': 'showFilesPage',
            'signin': 'signin',
            'signup': 'signup',
            '*splat': 'defaultRoute'
        },

        initialize: function () {
            // this.route(/\/?/, 'hello', this.showFrontPage);
        },

        // routing handlers
        showFrontPage: function () {
            console.log('hey');
        },

        showFilesPage: function () {
        },

        signin: function () {
            var signinView = new SigninView();
            $('body').append(signinView.render().$el);
        },

        signup: function () {
            var signupView = new SignupView();
            $('body').append(signupView.render().$el);
        },

        defaultRoute: function () {
            console.log('blah');
        }

    });

    return AppRouter;
});
