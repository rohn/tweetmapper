// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
],

function($, _, Backbone, Router){
  var app = {
    root: '/'
  };

  return _.extend(app, {

  }, Backbone.Events);
  console.log('in APP.JS');
});
