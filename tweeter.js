var url = 'http://api.twitter.com/1/statuses/user_timeline.json?callback=?'
        + '&screen_name=rohn';
var locations = [];
var map;

$.getJSON(
    url,
    function (data)
    {
        var $tweets = $('#tweets');
        $tweets.empty();
        if (data.length !== 0) {
            $.each(data, function (i, tweet)
            {
                if (tweet.text !== undefined ) {
                    $tweets.append($('<li></li>', { text: tweet.text }));
                    if (tweet.geo != null) {
                        locations.push(Array(tweet.text, tweet.geo.coordinates[0], tweet.geo.coordinates[1]));
                    }
                    console.log(tweet);
                }
            });
            if (supports_geolocation()) {
                get_location();

                for (i = 0; i < locations.length; i++) {
                  marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    title: locations[i][0],
                    map: map
                  });
                }
            }
        } else {
            $tweets.append($('<li></li>', { text: 'No recent tweets' }));
        }

    }
);


function supports_geolocation() {
  return !!navigator.geolocation;
}

function get_location() {
  if ( supports_geolocation() ) {
    navigator.geolocation.getCurrentPosition(show_map, handle_error);
  } else {
    // no native support;
    $("#msg").text('Your browser doesn\'t support geolocation!');
  }
}

function show_map(position) {
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
    var map = new google.maps.Map(document.getElementById("geo-wrapper"), myOptions);

    // var marker = new google.maps.Marker({
    //     position: latlng,
    //     title:"You are here (more or less)!"
    // });

    // To add the marker to the map, call setMap();
    marker.setMap(map);

    $("#msg").text('Your browser thinks you are here:');
    $("#lat").text('Latitude: ' + latitude);
    $("#long").text('Longitude: ' + longitude);
}

function handle_error(err) {
  if (err.code == 1) {
    // user said no!
    $("#msg").text('You chose not to share your location.');
  }
}