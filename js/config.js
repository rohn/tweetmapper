// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["main"],

  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    handlebars: 'libs/handlebars/handlebars',
    templates: '../templates'
  },

  shim: {
	'handlebars': {
		exports: 'Handlebars'
	}
  }

});