const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
//word:count
let message = [];
let recentMessage = "No messages yet";

app.use(bodyParser.json());
app.set('view engine', 'pug')

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {message, recentMessage})
});

app.post('/push', (req, res) => {
  console.log(Object.keys(req));
  if(!req.body || !req.body.message || !req.body.message.data) {
    console.log('Could not process message');
    return res.send('Could not process message');
  }
  console.log('body: ' + req.body.message.data);
  console.log(message);
  console.log('Updating message value');
  let data = parseDataIntoValue(req.body.message.data);
  recentMessage = data;
  updateMessageWithData(data);
  res.status(200).send(`Got topic push with message: ${req.body.message.data}`)
});

function parseDataIntoValue(data) {
  let parsed = new Buffer(data, 'base64').toString('utf-8');
  parsed = parsed.replace(/['"]/g,'');
  console.log('parsed: ', parsed);
  return parsed;
}

/**
The data form needs to follow [['foo', 12], ['bar', 6]]
**/
function updateMessageWithData(data) {
  //split the sentence
  let splitWord = data.split(' ');
  let wordFound = false;
  splitWord.forEach(word => {
    console.log('Current word: ', word);
    for(let i = 0; i < message.length; i++) {
      if(message[i][0] == word) {
        message[i][1] > 50 ? message[i][1] = 30 : message[i][1]++;
        wordFound = true;
      }
    }
    if(!wordFound) {
      //add word to dictionary
      message.push([word, 15]);
    }
    wordFound = false;
  });
  console.log(`Updated Message Value:`, message);
}

//test
