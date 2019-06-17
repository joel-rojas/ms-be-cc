"use strict";

const {serverUrl, serverPort, consumerKey,
    consumerSecret, accessToken, accessTokenSecret} = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const keyPath = path.join(__dirname, '..', 'certs', 'server.key');
const certPath = path.join(__dirname, '..', 'certs', 'server.cert');
const routes = require('./routes');

const app = express();

const server = require('https').createServer({
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
}, app);

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.options('*', cors());

routes(app, {
    consumerKey,
    consumerSecret,
    accessToken,
    accessTokenSecret
});

// Start server
server.listen(serverPort, serverUrl, function () {
    console.log('Express server listening on %d', serverPort);
});
  
module.exports = app;
