require([
  'app',
  'router',
  'handlebars'
],

function(app, Router, Handlebars){

  app.router = new Router();

  Backbone.history.start();

});
