"use strict";

const {serverUrl, serverPort, consumerKey,
    consumerSecret, accessToken, accessTokenSecret} = require('./config');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const server = require('http').createServer(app);

app.use(cors());
app.options('*', cors());

routes(app, {
    consumerKey,
    consumerSecret,
    accessToken,
    accessTokenSecret
});

server.listen(serverPort, serverUrl, function () {
    console.log('Express server listening on %d', serverPort);
});
  
module.exports = app;
