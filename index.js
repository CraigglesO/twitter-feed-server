'use strict'
var express = require('express');
var app = express();

const Job = require('./eventModule.js');
const fs = require('fs');

// client.post('statuses/update', {status: 'One more test for good measure.'},  function(error, tweet, response) {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });



//CronJob:
// *       | *      | *     | *     | *      | *
// Seconds | Minuts | Hours | Days  | Months | Weeks
// (0-59)  | (0-59) | (0-23)| (0-31)| (0-11) | (0-6)

// var job = new CronJob('00 00 00 * * *', function() {
//     //This will check for updates every hour
//   }

app.set('port', (process.env.PORT || 5000));


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




var jobQueue = [];

// var job = new Job('first job','00 48 21 * * 0-6','Seventh post','alert',true,true);
// jobQueue.push(job);
// var job = new Job('second job','30 48 21 * * 0-6','Eight post','alert',true,true);
// jobQueue.push(job);
// console.log(jobQueue);
// jobQueue[1].stop();
// console.log(jobQueue);

//sync method upon starting app:
var data = JSON.parse(fs.readFileSync('alerts.json', 'utf8'));
fs.writeFileSync('alerts2.json', JSON.stringify(data),'utf8');

data.forEach((x,i) => {
  // console.log(`index ${i} is:`);
  // console.log(x);
  // console.log(x.name);
  // console.log();
  if (x.function === 'add'){
    var job = new Job(x.name,x.frequency,x.content,x.type,x.repeat,x.timeStamp);
    jobQueue.push(job);
    console.log(`added ${x.name}.`);
  }

  else if (x.function === 'remove'){
    do {
      var i = jobQueue.indexOf(x.name);
      if (i !== -1){
        jobQueue[i].stop();
        jobQueue.splice(i,1);
      }
    } while (i !== -1);
    //add method of removing all relavant JSON from file
    console.log(`removed ${x.name}`)
  }
});





fs.watchFile('alerts.json', (curr, prev) => {
  //add or subtract an alert
  // console.log(`the current mtime is: ${curr.mtime}`);
  // console.log(`the previous mtime was: ${prev.mtime}`);
});
