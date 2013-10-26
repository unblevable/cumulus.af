define(function (require, exports, module) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        AppRouter = require('routers/AppRouter'),
        TeamPageTemplate = require('text!templates/team_page_template.html');

    var TeamPageView = Backbone.View.extend({

        id: 'team-container',

        template: _.template(TeamPageTemplate),

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

    return TeamPageView;
});
