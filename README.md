good tut (https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js)


# hancock scrapper
CHALLENGE OVERVIEW
Challenge Description

This challenge will be a proof of concept as the base for a new project for analyzing social media posts using sentiment analysis.  The sentiment analysis will be used to determine trends in sentiment over a period of time.

John Hancock, like any company, cares about its customers and how it’s being perceived in social media. Many companies have failed to monitor these communication avenues at their peril as now more than ever it is where people go to both praise and criticize their experiences with brands.

This challenge will focus on capturing Twitter and Facebook messages over a period of time and putting them into a consistent MongoDB structure that can be later analyzed by the analysis service, which will be developed separately.
Environment Requirements

You are welcome to offer suggestions for languages and libraries to use for this particular challenge, with these guidelines:

1.  The latest version of Node is required
2.  The solution must be deployable to Heroku
3.  The solution must use MongoDB as the backend data storage

Twitter data

For this challenge, you must implement a Twitter scraper that can import data from Twitter.  We need the ability to filter this data based on one of these items, or a combination of them:

1.  [] Hashtag
2.  [] Keywords, like "Boston Marathon", or "John Hancock 401K"
3.  [] The tweets and replies for a specific twitter handle
4.  [] Geolocation, given a latitude, longitude, and radius value (in miles)
5.  [] A period of time (going as far back as we can with the current Twitter API. If we can get creative and pull data further back than what the official Twitter API allows, that's a definite bonus and would be worthy of additional points in the scorecard.)

Facebook data

For this challenge, you must implement a Facebook scraper that can import data from a Facebook page.  Note that this will be per-page, with the page having granted access to the Facebook scraper to be able to pull this data.  For this initial challenge, we will pull all comments / conversations of the page.

https://developers.facebook.com/docs/graph-api/reference/page/conversations

Note that you should describe how to set up a test page and point the scraper to it as part of your deployment guide

Data storage

Any data captured should be stored in a MongoDB for future analysis and retrieval.  Please make the data schema generic - it should not be Twitter specific.  Please store:

* Full text of the Facebook comment or tweet
* URL or ID of the comment or tweet
* Hashtags associated with the comment or tweet
* Date/time of the comment or tweet
* Geolocation data (if available)
* User ID / username of the user that posted the comment or tweet
* The name of the scraper that captured the data

Constant scraping

Once a scraper has populated it's initial data, each subsequent run of the scraper should pull in only the most recent data, going back to the last time the scraper ran.  There should be a way to tell the scraper to re-scrape all data and not just the data since the last time the scraper ran.

We will need a separate table in the MongoDB to capture the scraper state information, and the configuration (below in Configuration section)

* Last time the scraper ran
* Scraper was successful or failure
* Flag to tell the scraper to re-scrape all data

Configuration

The configuration for the scrapers should be done in MongoDB manually.  Any number of scrapers should be configurable with data like:

* Scraper Name
* Scraper filter parameters (for Twitter scraper)
* Facebook page name (for Facebook scraper)

Please provide at least two separate Twitter configurations showing the options listed above, and one sample configuration for Facebook (or details on how to set that up for a page)

Scheduling

The scraping functionality should be configurable to run on a regular basis.  Have a look at the Heroku scheduler:

https://elements.heroku.com/addons/scheduler