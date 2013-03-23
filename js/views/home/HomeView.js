define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html',
  'collections/searchTweets/SearchTweetsCollection',
  'views/tweets/TweetsView'],

function($, _, Backbone, homeTemplate, SearchTweetsCollection, TweetsView) {

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    events: {
      "click button.btn": "searchTwitter"
    },

    initialize: function() {
      this.collection = new SearchTweetsCollection();
      this.render();
    },

    render: function() {
      this.$el.html(homeTemplate);
    },

    onDataHandler: function(collection) {
      var tweetsView = new TweetsView({
        collection: collection
      }).render();
    },

    searchTwitter: function() {
      var that = this;
      this.collection.query = escape(this.$('.searchInfo').val());
      this.collection.fetch({
        success: that.onDataHandler,
        error: function(errorResponse) {
          console.error('Failed to fetch!');
          alert('There was a problem');
        }

      });
    }

  });

  return HomeView;

});