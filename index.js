"use strict";

const config = require('./config.json');
const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();

var server = require('http').createServer(app);

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.options('*', cors());

routes(app);

// Start server
server.listen(config.port, config.serverUrl, function () {
    console.log('Express server listening on %d', config.port);
});
  
module.exports = app;
