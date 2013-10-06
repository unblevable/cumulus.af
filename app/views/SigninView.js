define(function (require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        SigninTemplate= require('text!templates/signin_template.html');

    var SigninView = Backbone.View.extend({

        id: 'signin-container',

        template: _.template(SigninTemplate),

        events: {
        },

        initialize: function () {
        },

        render: function () {
            this.$el.append(this.template);

            return this;
        }
    });

    return SigninView;
});
