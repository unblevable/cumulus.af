define(function (require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        AppRouter = require('routers/AppRouter'),
        UserPageTemplate = require('text!templates/user_page_template.html');

    var UserPageView = Backbone.View.extend({

        id: 'user-container',

        template: _.template(UserPageTemplate),

        events: {
            'click #signin': function (event) {
                // this.router.navigate('/signin', { trigger: true });
                // this.$el.remove();
            },
            'click #signup': function (event) {
                // this.router.navigate('/signup', { trigger: true });
                // this.$el.remove();
            },
        },

        initialize: function () {
        },

        render: function () {
            this.$el.append(this.template);

            return this;
        }
    });

    return UserPageView;
});
