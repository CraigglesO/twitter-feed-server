'use strict'

require('dotenv').config();

const fs = require('fs');
const Twitter = require('twitter');
const CronJob = require('cron').CronJob;

let client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


module.exports = class job {

  constructor(name,freq,con,type,repeat,ts){
    this.name = name;
    this.frequency = freq; //'00 30 18 * * 0-6'
    this.content = con;
    this.type = type;



    this.event_init = new CronJob(this.frequency, function() {
      /*
       * Runs every weekday (Monday through Friday)
       * at 6:30:00 PM. It does run on Saturday
       * and Sunday.
       */
       let timestamp = "";
       if (ts === true){
         var time = new Date();
         let hour = ("0" + ((time.getHours() + 20) % 24)).slice(-2);
         let min = ("0" + time.getMinutes()).slice(-2);
         timestamp = `${hour}:${min} - `;
       }
       client.post('statuses/update', {status: timestamp+con},  function(error, tweet, response) {
         if(error) console.log(error);
       });
       if (repeat === false){
         this.stop();
       }
      },
      function () {
        /* This function is executed when the job stops */
        console.log(`${name} has finished.`);
      },
      true, /* Start the job right now */
      'America/New_York' /* Time zone of this job. */
    );
  }

  edit (name,ts,con) {
    this.name = name;
    this.frequency = freq;
    this.content = con;
  }

  stop () {
    this.event_init.stop();
  }

}


function getQuote() {
  //read file... (365 - today's_date) % 101;
  //convert to string....
}
