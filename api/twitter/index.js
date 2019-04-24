"use strict";

const express = require('express');

const controller = require('./twitter.controller');

const router = express.Router();

router.get('/tweets/:username', controller.twitterUserList.bind(controller));

module.exports = router;