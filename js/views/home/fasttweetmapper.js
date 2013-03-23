var Item = Backbone.Model.extend();

var List = Backbone.Collection.extend({
    model: Item,

    url: function() {
        return 'http://search.twitter.com/search.json?q=' + this.query;
    },

    parse: function(response) {
        return response.results;
    },

    sync: function(method, model, options) {
        var that = this;
        var params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: that.url(),
            processData: false
        }, options);

        return $.ajax(params);
    }
});

var ListView = Backbone.View.extend({
    el: $('#test'),
    events: {
        'click button#add': 'getPost'
    },
    initialize: function() {
        _.bindAll(this, 'render', 'getPost');
        this.collection = new List();
        this.render();
    },
    render: function() {
        var self = this;
        $(this.el).append("<button id='add'>get</button>");
    },
    template: _.template($('#tracks').html()),
    getPost: function() {
        var that = this;
        this.collection.query = $('#search').val();
        console.log(this.collection);
        this.collection.fetch({
            success: function() {
                console.log(that.collection.toJSON());
                $(that.el).html(that.template({
                    playlists: that.collection.toJSON()
                }));
            },
            error: function() {
                console.log('Failed to fetch!');
            }

        });
    }

});

// **listView instance**: Instantiate main app view.
var listView = new ListView();