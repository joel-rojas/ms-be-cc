"use strict";

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    serverUrl: process.env.SERVER_URL,
    serverPort: process.env.SERVER_PORT
};