/**
 * Created by adel on 5/8/17.
 */
"use strict";


var Twit = require('twit');
var Moment = require('moment');
let inherits = require('util').inherits;
let EventEmitter = require('events').EventEmitter;
let MonogClient = require('mongodb').MongoClient;

let dbUrl = 'mongodb://localhost:27017/myproject';

const twitCreds = {

    consumer_key: 'BkMtHh77a20ivHeyG8iR211gr',
    consumer_secret : 'aSMoIoC4jzFgoxaTk93moHq1WVKThtifPiHT5ExaBCWKUes7fc',
    access_token: '475873561-6euoAC72Idkov7S6JL0VnWMkZm4jPiaxfRPNmR5u',
    access_token_secret: 'accfKza31BiD3NEkQlFQjO9C8qm4brpxK1fhOLpTWC8Jj',
    timeout_ms : 60*1000

};

// var T = new Twit();

// T.get('search/tweets', {q : '%40JohnHancockUSA', count:1},
//
//     (err,data, response) => {
//
//     data.statuses.forEach((post)=>{
//         extractHashTags(post);
//         console.log(post)
//     })
//
// });
//
let  dummy_scrapper_data = [
    {
        name:'scap1',
        q:'%40JohnHancockUSA',
        count: 3,
        type:'tw',
        lastrunStart:'',
        lastrunEnd:''},
    {
        name:'scap2',
        q:'%40Nike',
        coutn:2,
        type:'tw',
        lastrun:'',
        lastrunEnd:''},
    {
        name:'scap3',
        q:'%40mjkeenan',
        count:5,
        type:'tw',
        lastrun:'',
        lastrunEnd:''}

];



var Scrapper = function (config) {

    this.status = {};

    this.config = config;
    this.result = undefined;
    this.parsed= undefined;
    this.status.running = false;
    this.T = new Twit(twitCreds);

    function checkConfig(config){


    }

}
inherits(Scrapper,EventEmitter);

Scrapper.prototype.start = function(callback){


    let self =this;

    self.emit("started",this.config);
    this.fetch();
    this.status.running = true;
    this.config.lastrun =  Moment().format('MMMM Do YYYY, h:mm:ss a');

    callback(this.config.name+" started");
    




    // let pr = new Promise((resolve,reject) => {
    //
    //
    //     // console.log(self.config);
    //     (function(x){// setTimeOut closure
    //
    //         setTimeout(() => {
    //
    //             resolve(x);
    //
    //         }, Math.floor(Math.random()*10000));
    //
    //
    //     })(self)
    //
    // });
    //
    // return pr;


}

/**
 *
 */
Scrapper.prototype.stop = function(){

    if(this.status.running){

        this.status.running = false;
        this.abort();
        this.emit("aborted",this.config);


    }else{
        return;
    }

}

/**
 * Fetch data from Rest API using twit rest request.
 *
 * TODO:
 * - should have a query builder
 * - emitting to who?
 */

Scrapper.prototype.fetch = function(){

    let self = this;
    self.T.get('search/tweets', {q : this.config.q, count:this.config.count}, (err,data, response) => {

        // callback(this.config.name+" got data");
        this.result = data;
        data.statuses.forEach((post)=>{
            // extractHashTags(post);
            console.log(post.id);
        });
        self.emit('completed',this);

    });


}

/**
 * Parse raw json data and create the desired schema
 *
 */

Scrapper.prototype.parse= function(){

    if(!this.result){
        console.error("no result to be parsed");
        return;
    }


}


/**
 * It's imposible to abort the HTTP request since don'nt have access to request object!
 */
Scrapper.prototype.abort = function(){



}

/**
 * Saves current instance of scrapper confing into the Db
 * - should it be here ?
 * -
 */
Scrapper.prototype.save = function(){

    MonogClient.connect(dbUrl,(err, db) => {

        console.log("connected Sucessfully to the server");


    });

}

Scrapper.prototype.getStatus = function(){

    return this.status.running;

}



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

let scrpMngr = new ScrapperManager();
scrpMngr.startAll();
// scrpMngr.start("scap2");


function extractHashTags(tw){

    let m = tw.text.match(/#\w+/g);
    tw.hashtags = m;
    return m;

}




