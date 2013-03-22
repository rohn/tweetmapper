define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    render: function(){
      this.$el.html(homeTemplate);
    },

    events: {
      "submit form": "searchTwitter"
    },

    searchTwitter: function(ev) {
      alert(this.$(".searchInfo").val());
      debugger;
      app.router.navigate("searchRequest", this.$(".searchInfo").val());
      return false;
    }

  });

  return HomeView;

});
