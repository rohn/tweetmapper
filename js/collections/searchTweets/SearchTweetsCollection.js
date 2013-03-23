define([
  'underscore',
  'backbone',
  'models/searchTweet/SearchTweetModel'], function(_, Backbone, SearchTweetModel) {

  var SearchTweetsCollection = Backbone.Collection.extend({

    model: SearchTweetModel,

    initialize: function(models, options) {},

    url: function(searchQuery) {
      return 'http://search.twitter.com/search.json?q=' + searchQuery + '&include_entities=false';
    },

    parse: function(response) {
      return response.results;
    },

    sync: function(method, model, options) {
      var that = this;
      var params = _.extend({
        type: 'GET',
        dataType: 'jsonp',
        url: that.url(model.query),
        processData: false
      }, options);

      return $.ajax(params);
    }
  });

  return SearchTweetsCollection;

});