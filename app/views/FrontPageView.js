define(function (require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('Backbone');
    console.log(Backbone);

    var FrontPageTemplate = require('text!templates/front_page_template.html');

    var FrontPageView = Backbone.View.extend({

        id: 'container',

        template: _.template(FrontPageTemplate),

        events: {
            'click #signup': function (event) {

            },
            'click #login': function (event) {
            }
        },

        initialize: function () {
        },

        render: function () {
            this.$el.append(this.template);
        }
    });

    return FrontPageView;
});
