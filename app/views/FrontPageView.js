define(function (require, exports, module) {
    $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),

    FrontPageTemplate = require('text!templates/front_page.html'),

    var FrontPageView = Backbone.View.extend({

        id: 'front-page',

        template: _.template(FrontPageTemplate),

        events: {
            'click #signup': function (event) {
            },
            'click #login': function (event) {
            }
        },

        initialize: function () {
        }
    });

    return FrontPageView;
});
