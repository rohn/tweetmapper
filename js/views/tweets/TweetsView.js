define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/user/UserView.js',
  'text!templates/tweets/tweetsTemplate.hbs'
],

function($, _, Backbone, UserView, tweetsTemplate){

  var TweetsView = Backbone.View.extend({
    el: "#searchResults",

    initialize: function() {
      // this.render();
    },

    events: {
      "click td" : "userClicked"
    },

    render: function(){
      var returnedTweets ={"tweets": this.collection.toJSON()};
      var compiledTemplate = Handlebars.compile(tweetsTemplate);
      this.$el.html(compiledTemplate(returnedTweets));
    },

    userClicked: function(ev) {
      // alert('user clicked' + ev.currentTarget.className);
      var userView = new UserView({user_name: ev.currentTarget.className});
      // userView.render();
      userView.showModal({
        showCloseButton: false
      });
    }

  });

  return TweetsView;

});
