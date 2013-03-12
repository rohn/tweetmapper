var url = 'http://api.twitter.com/1/statuses/user_timeline.json?callback=?'
        + '&screen_name=rohn';

$.getJSON(
    url,
    function (data)
    {
        var $tweets = $('#tweets');
        $tweets.empty();
        if (data.length !== 0) {
            $.each(data, function (i, tweet)
            {
                if (tweet.text !== undefined && tweet.geo != null) {
                    $tweets.append($('<li></li>', { text: tweet.geo }));
                }
            });
        } else {
            $tweets.append($('<li></li>', { text: 'No recent tweets' }));
        }
    }
);