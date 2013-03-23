// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'router', // Request router.js
],

function($, _, Backbone, Handlebars, Router){
  var app = {
    root: '/'
  };

  return _.extend(app, {

  }, Backbone.Events);
  console.log('in APP.JS');
});
