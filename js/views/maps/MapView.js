define([
  'jquery',
  'underscore',
  'backbone',
  'models/person/PersonModel',
  'collections/tweets/TweetsCollection',
  'text!templates/map/mapTemplate.html'
], function($, _, Backbone, PersonModel, TweetsCollection, mapTemplate){

  var locations = [];
  var map;
  var markerArray = [];

  var MapView = Backbone.View.extend({
    el: $("#page"),
    model: this.model,

    initialize: function(){
      var that = this;

      var onDataHandler = function(collection) {
        that.render();

        $.each(that.collection.models, function(i, tweet) {
          if (tweet.attributes.geo != null) {
            locations.push(Array(tweet.attributes.text, tweet.attributes.geo.coordinates[0], tweet.attributes.geo.coordinates[1]));
          }
        });
        that.rohnFunc();
      };

      this.collection = new TweetsCollection({tweeter:this.model.attributes.tweeter});
      this.collection.fetch({
        success : onDataHandler,
        dataType: "jsonp"
      });
    },

    render: function(){
      var data = {tweeter: this.model};
      var compiledTemplate = _.template( mapTemplate, data );
      this.$el.html(compiledTemplate);
    },


    rohnFunc: function() {
      if (this.supports_geolocation()) {
        // this.get_location();
        var marker;
        for (var i = 0, len = locations.length; i < len; i++) {
            var latlngset = new google.maps.LatLng(locations[i][1], locations[i][2]);
            var tweetText = locations[i][0];
            marker = new google.maps.Marker({
              position: latlngset,
              title: tweetText,
              map: map
            });
            markerArray.push(marker);
        }
        this.get_location();
      }
    },



    supports_geolocation: function() {
      return !!navigator.geolocation;
    },

    get_location: function() {
      if ( this.supports_geolocation() ) {
        navigator.geolocation.getCurrentPosition(this.show_map, this.handle_error);
      } else {
        // no native support;
        $("#msg").text('Your browser doesn\'t support geolocation!');
      }
    },

    show_map: function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      // let's show a map or do something interesting!

      $("#geo-wrapper").css({'width':'640px','height':'480px'});

      var latlng = new google.maps.LatLng(latitude, longitude);
      var myOptions = {
          zoom: 10,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("geo-wrapper"), myOptions);

      // marker.setMap(map);
      for (var i in markerArray) {
        markerArray[i].setMap(map);
      }
    },

    handle_error: function(err) {
      if (err.code == 1) {
        // user said no!
        $("#msg").text('You chose not to share your location.');
      }
    }

  });

  return MapView;

});
