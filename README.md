Tweet Mapper
============

playing around with a tweet to google api example

![Start Page](screenshots/Selection_001.png)


Format
------
the map of tweets (which have geo data) can be called directly with this url:
> http://localhost/tweetmapper/#/map/<twitter_user_name>

A good one to try that I was testing with is InfinityBalloon
> http://localhost/tweetmapper/#/map/InfinityBalloon


Important Notes
---------------
instead of using GET search/tweets (which returns an error) use the following format:

> http://search.twitter.com/search.json?q=search%20criteria&rpp=100&include_entities=true&result_type=mixed

the error given by the GET search/tweets API is:
> {"errors":[{"message":"Bad Authentication data","code":215}]}

twitter documentation indicates the necessity of using OAUTH to use this API
> https://dev.twitter.com/docs/api/1.1/get/search/tweets