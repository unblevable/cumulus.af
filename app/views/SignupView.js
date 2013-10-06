define(function (require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        AppRouter = require('routers/AppRouter'),
        SignupTemplate= require('text!templates/signup_template.html');

    var SignupView = Backbone.View.extend({

        id: 'signup-container',

        template: _.template(SignupTemplate),

        events: {
        },

        initialize: function () {
            // var appRouter = new AppRouter();
        },

        render: function () {
            this.$el.append(this.template);

            return this;
        }
    });

    return SignupView;
});
