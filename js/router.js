// Filename: router.js
define([
  'app',
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'views/home/HomeView',
  'views/maps/MapView',
  'models/person/PersonModel',
  'views/footer/FooterView'],

function(app, $, _, Backbone, Handlebars, HomeView, MapView, PersonModel, FooterView) {

  var Router = Backbone.Router.extend({
    initialize: function() {},

    routes: {
      'map': 'showMap',
      'map/:person': 'showMapUser',

      // Default
      '': 'defaultAction'
    },

    showMap: function() {
      alert('no user');
      var mapView = new MapView();
      mapView.render();
      var footerView = new FooterView();
    },

    showMapUser: function(twitterUser) {
      var person = new PersonModel({
        tweeter: twitterUser
      });
      var mapView = new MapView({
        model: person
      });
      mapView.render();

      var footerView = new FooterView();
    },

    searchRequest: function() {
      alert('in search!!');
    },

    defaultAction: function(actions) {
      // We have no matching route, lets display the home page
      var homeView = new HomeView();
      // homeView.render();

      // unlike the above, we don't call render on this view
      // as it will handle the render call internally after it
      // loads data
      var footerView = new FooterView();
    }

  });

  return Router;
});