define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tweets/tweetsTemplate.html'
],

function($, _, Backbone, tweetsTemplate){

  var TweetsView = Backbone.View.extend({
    el: "#searchResults",

    initialize: function() {
      this.render();
    },

    render: function(){
      var returnedTweets ={"tweets": this.collection.toJSON()};
      var compiledTemplate = _.template(tweetsTemplate, returnedTweets);
      this.$el.html(compiledTemplate);
    }

  });

  return TweetsView;

});
