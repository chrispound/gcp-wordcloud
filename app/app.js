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
  console.log('body: ' + req.body.message);
  console.log(message);
  console.log('Updating message value');
  message = `${req.body.message}`;
  console.log(`New message value: ${req.body.message}`);
  res.send(`Got topic push with message: ${req.body.message}`)
});

//test
