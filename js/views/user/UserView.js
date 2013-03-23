define([
  'jquery',
  'underscore',
  'backbone',
  'models/user/UserModel',
  'text!templates/user/userTemplate.hbs',
  'backboneModalDialog'],

function($, _, Backbone, UserModel, userTemplate) {

  var userView = Backbone.ModalView.extend({

    initialize: function(options) {
      var that = this;

      this.model = new UserModel({
        user_name: options.user_name
      });
      this.getSomeData();
    },

    events: {
      "click .showthemap": "showTheMap"
    },

    showTheMap: function() {
      this.hideModal();
    },

    getSomeData: function() {
      var that = this;

      this.model.fetch({
        success: that.onDataHandler,
        error: function(errorResponse) {
          console.error('Failed to fetch!');
          alert('There was a problem');
        }
      }).complete(function() {
        that.render();
      });
    },

    onDataHander: function() {
      this.render();
    },

    render: function() {
      var compiledTemplate = Handlebars.compile(userTemplate);
      this.$el.html(compiledTemplate(this.model.attributes));
    }

  });

  return userView;

});