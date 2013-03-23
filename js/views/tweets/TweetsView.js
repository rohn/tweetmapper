define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tweets/tweetsTemplate.hbs'
],

function($, _, Backbone, tweetsTemplate){

  var TweetsView = Backbone.View.extend({
    el: "#searchResults",

    initialize: function() {
      // this.render();
    },

    render: function(){
      var returnedTweets ={"tweets": this.collection.toJSON()};
      var compiledTemplate = Handlebars.compile(tweetsTemplate);
      this.$el.html(compiledTemplate(returnedTweets));
    }

  });

  return TweetsView;

});
