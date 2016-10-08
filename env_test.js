require('dotenv').config();
const Twitter = require('twitter');

// if(!process.env.CONSUMER_KEY) {
//   var env = require('./env.js')
// }

let client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

client.post('statuses/update', {status:'another test using require dotenv'},  function(error, tweet, response) {
  if(error) console.log(error);
});
