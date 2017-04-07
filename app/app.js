const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
let message = "No messages yet.";

app.use(bodyParser.json());
app.set('view engine', 'pug')

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {message})
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
  message = new Buffer(req.body.message.data, 'base64').toString('utf-8');
  console.log(`New message value: ${req.body.message.data}`);
  res.status(200).send(`Got topic push with message: ${req.body.message.data}`)
});

//test
