/**
 * Created by adel on 5/15/17.
 */

const Twit = require('twit');
const Moment = require('moment');
const inherits = require('util').inherits;
const EventEmitter = require('events').EventEmitter;
const MongoClient = require('mongodb').MongoClient;

let dbUrl = 'mongodb://localhost:27017/myproject';

const twitCreds = {

    consumer_key: 'BkMtHh77a20ivHeyG8iR211gr',
    consumer_secret : 'aSMoIoC4jzFgoxaTk93moHq1WVKThtifPiHT5ExaBCWKUes7fc',
    access_token: '475873561-6euoAC72Idkov7S6JL0VnWMkZm4jPiaxfRPNmR5u',
    access_token_secret: 'accfKza31BiD3NEkQlFQjO9C8qm4brpxK1fhOLpTWC8Jj',
    timeout_ms : 60*1000

};

var ScrapperManager = function(config){

    let _numberOfScrapers = 0;
    this.scrappers = []
    var self = this;

    dummy_scrapper_data.forEach((scp)=>{

        self.scrappers.push(new Scrapper(scp));
        ++_numberOfScrapers;

    })




}

ScrapperManager.prototype.start = function(scrapperName){

    let scrapper = this.scrappers.filter(( obj ) => {
        return obj.config.name === scrapperName;
    })[0];

    if(scrapper){

        scrapper.start();

    }

}

ScrapperManager.prototype.startAll = function(){

    this.scrappers.forEach((scrapper) => {

        scrapper.on('started',(msg) => {console.log(msg)})
        scrapper.start((msg)=>{

            console.log(msg);

        });

    })

}
