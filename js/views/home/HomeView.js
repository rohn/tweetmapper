define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html',
  'collections/searchTweets/SearchTweetsCollection'
],

function($, _, Backbone, homeTemplate, SearchTweetsCollection){

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    events: {
      "click button.btn": "searchTwitter"
    },

    initialize: function() {
      // _.bindAll(this, 'render', 'searchTwitter');
      this.collection = new SearchTweetsCollection();
      this.render();
    },

    render: function(){
      this.$el.html(homeTemplate);
    },

    onDataHandler: function(collection) {
        $.each(collection.models, function(i, tweet) {
          console.log(tweet);
        });
          debugger;
      },

    searchTwitter: function() {
        // debugger;
        var that = this;
        this.collection.query = escape(this.$('.searchInfo').val());
        this.collection.fetch({
            // success: function(response, xhr) {
            //     console.log(that.collection.toJSON());
            //     debugger;
            // },
            success: that.onDataHandler,
            error: function(errorResponse) {
                console.log('Failed to fetch!');
            }

        });
    }

  });

  return HomeView;

});
