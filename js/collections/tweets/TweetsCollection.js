define([
  'underscore',
  'backbone',
  'models/tweet/TweetModel'], function(_, Backbone, TweetModel) {

  var TweetsCollection = Backbone.Collection.extend({

    initialize: function(tweeter, options) {
      this.tweeter = tweeter;
    },

    url: function() {
      var tweetUrl = 'http://api.twitter.com/1/statuses/user_timeline.json?callback=?' + '&screen_name=' + this.tweeter.tweeter + '&count=100';
      return tweetUrl;
    },

  });

  return TweetsCollection;

});