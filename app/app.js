const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
//word:count
let words = [];
const wordCount = {}
const BASE_VALUE = 15
let recentMessage = "No messages yet";


app.use(bodyParser.json());
app.set('view engine', 'pug')

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {words, recentMessage})
});

app.post('/push', (req, res) => {
  console.log(Object.keys(req));
  if(!req.body || !req.body.message || !req.body.message.data) {
    console.log('Could not process message');
    return res.send('Could not process message');
  }
  console.log('body: ' + req.body.message.data);
  console.log(words);
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
  splitWord.forEach(word => {
    wordCount[word] ? wordCount[word] +=1 : wordCount[word] = 1
  });

  console.log('wordCount',wordCount);

  words =[];
  Object.keys(wordCount).forEach(word => {
    console.log('word', word);
    words.push([word, wordCount[word] + BASE_VALUE])
  });

  console.log(`Updated Message Value:`, words);
}
