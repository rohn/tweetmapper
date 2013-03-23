define([
  'jquery',
  'underscore',
  'backbone',
  'collections/searchTweets/SearchTweetsCollection',
  'text!templates/searchTweets/searchTweetsTemplate.html'
],

function($, _, Backbone, SearchTweetsCollection, searchedTweetsTemplate){

  var SearchedTweetsView = Backbone.View.extend({
    // el: $("#foundTweets"),

    initialize: function(options){
      var that = this;

      var onDataHandler = function(collection) {
        console.log(that.collection.toJSON());
        debugger;
        that.render();

      };
      var onDataError = function(m,r) {
        console.log(r.responseText);
        debugger;
      };

      this.collection = new SearchTweetsCollection([], {searchText:options.searchText});
      // this.collection.query = options.searchText;
      debugger;
      this.collection.fetch({
        success : onDataHandler,
        error: function(a,b,c,d) {
          alert('failed to fethc!!!');
                console.log('Failed to fetch!');
                debugger;
            }
      });
    },

    render: function(){
      debugger;
      var data = this.collection;
      var compiledTemplate = _.template( searchTweetsTemplate, data );
      this.$el.html(compiledTemplate);
    }

  });

  return SearchedTweetsView;

});
