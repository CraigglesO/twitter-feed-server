'use strict'
const express        =        require("express");
const bodyParser     =        require("body-parser");
const app            =        express();

const Job            =        require('./eventModule.js');
const fs             =        require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// client.post('statuses/update', {status: 'One more test for good measure.'},  function(error, tweet, response) {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });

//sync method upon starting app:

var jobQueue = [];
var data = JSON.parse(fs.readFileSync('alerts2.json', 'utf8'));
fs.writeFileSync('alerts2.json', JSON.stringify(data),'utf8');

data.forEach((x,i) => {
  // console.log(`index ${i} is:`);
  // console.log(x);
  // console.log(x.name);
  // console.log();
  var job = new Job(x.name,x.frequency,x.content,x.type,x.repeat,x.timeStamp);
  jobQueue.push(job);
  console.log(`added ${x.name}.`);
});

//CronJob:
// *       | *      | *     | *     | *      | *
// Seconds | Minuts | Hours | Days  | Months | Weeks
// (0-59)  | (0-59) | (0-23)| (0-31)| (0-11) | (0-6)

// var job = new CronJob('00 00 00 * * *', function() {
//     //This will check for updates every hour
//   }

// app.set('port', (process.env.PORT || 5000));

app.set('port', (5000));

app.get('/', function (req, res) {

  res.send('Server running.');
  //res.sendfile("index.html");

});

app.get('/request', function(req, res) {
  let date = new Date();
  console.log(`${date}: a new request was made`);
  res.send(data);

});

app.post('/add',function(req,res){

  let name         =    req.body.name;
  let frequency    =    req.body.frequency;
  let content      =    req.body.content;
  let timeStamp    =    req.body.timeStamp;
  let type         =    req.body.type;
  let repeat       =    req.body.repeat;

  var job = new Job(name,frequency,content,type,repeat,timeStamp);
  jobQueue.push(job);
  //add to data so we can rewrite alerts2:
  data.push({
    'name'       :    name,
    'frequency'  :    frequency,
    'content'    :    content,
    'timeStamp'  :    timeStamp,
    'type'       :    type,
    'repeat'     :    repeat
  });
  fs.writeFileSync('alerts2.json', JSON.stringify(data),'utf8');

  console.log(`added ${name}.`);
  res.end("yes");

});

app.post('/remove',function(req,res){

  let name         =    req.body.name;
  let frequency    =    req.body.frequency;
  let content      =    req.body.content;
  let timeStamp    =    req.body.timeStamp;
  let type         =    req.body.type;
  let repeat       =    req.body.repeat;

  //remove from jobQueue

  data.forEach((x,i) => {
    if (x.name === name){
      jobQueue[i].stop();
      jobQueue.splice(i,1);
      data.splice(i,1);
    }
  });

  fs.writeFileSync('alerts2.json', JSON.stringify(data),'utf8');

  console.log(`removed ${name}`)
  res.end("yes");

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// var job = new Job('first job','00 48 21 * * 0-6','Seventh post','alert',true,true);
// jobQueue.push(job);
// var job = new Job('second job','30 48 21 * * 0-6','Eight post','alert',true,true);
// jobQueue.push(job);
// console.log(jobQueue);
// jobQueue[1].stop();
// console.log(jobQueue);
