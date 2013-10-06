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
                this.$el.remove();
            },
            'click #signup': function (event) {
                this.router.navigate('/signup', { trigger: true });
                this.$el.remove();
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
