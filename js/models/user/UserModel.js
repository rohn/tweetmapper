define([
  'backbone',
],

function(Backbone) {

  var UserModel = Backbone.Model.extend({

  	initialize: function(options) {
  		this.user_name = options.user_name;
  	},

	url: function(userName) {
	    return 'https://api.twitter.com/1/users/show.json?screen_name='
	    	+ userName
	    	+ '&include_entities=false';
	},

	parse: function(response) {
  		return response;
    },

    sync: function(method, model, options) {
        var that = this;
        var params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: that.url(that.user_name),
            processData: false
        }, options);

        return $.ajax(params);
    }

  });

  return UserModel;

});
