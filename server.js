'use strict';

const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
  return fs.createReadStream('./index.html').pipe(res);
});
app.listen(3000, () => console.log('app is listening on port 3000...'));

const api = express();

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
api.options('*', (req, res) => {
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Max-Age', 86400);
  res.status(204);
  res.end();
})
api.post('/', (req, res) => {
  res.json({result: 'response from api(get)'});
});
api.post('/error', (req, res) => {
  res.status(500);
  res.json({result: 'error response from api(get)'});
});
api.listen(3001, () => console.log('api is listening on port 3001'));
