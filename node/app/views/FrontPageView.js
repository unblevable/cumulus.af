define(function (require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        AppRouter = require('routers/AppRouter'),
        FrontPageTemplate = require('text!templates/front_page_template.html');

    var FrontPageView = Backbone.View.extend({

        id: 'container',

        template: _.template(FrontPageTemplate),

        router: new AppRouter(),

        events: {
            'click #signin': function (event) {
                this.router.navigate('/signin', { trigger: true });
                this.$el.hide();
            },
            'click #signup': function (event) {
                this.router.navigate('/signup', { trigger: true });
                this.$el.hide();
            },
            'click #cloud-logo': function (event) {
                this.router.navigate('/team', { trigger: true });
                this.$el.hide();
            },
            'click .icon-sun': function (event) {
                this.router.navigate('/user', { trigger: true });
                this.$el.hide();
            },
        },

        initialize: function () {
            var appRouter = new AppRouter();
        },

        render: function () {
            this.$el.append(this.template);

            return this;
        }
    });

    return FrontPageView;
});
