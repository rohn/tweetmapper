// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/maps/MapView',
  'models/person/PersonModel',
  'views/footer/FooterView'
], function($, _, Backbone, HomeView, MapView, PersonModel, FooterView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'map': 'showMap',
      'map/:person': 'showMapUser',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:showMap', function(){
      alert('no user');
      var mapView = new MapView();
      mapView.render();

      var footerView = new FooterView();
    });

    app_router.on('route:showMapUser', function(twitterUser){
      var person = new PersonModel({tweeter: twitterUser});
      var mapView = new MapView({model:person});
      mapView.render();

      var footerView = new FooterView();
    });

    app_router.on('route:defaultAction', function (actions) {

       // We have no matching route, lets display the home page
        var homeView = new HomeView();
        homeView.render();

         // unlike the above, we don't call render on this view
        // as it will handle the render call internally after it
        // loads data
        var footerView = new FooterView();

    });

    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
