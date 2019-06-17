"use strict";

const express = require('express');

const twCtrl = require('./twitter.controller');

const router = express.Router();

router.get('/tweets/:username', twCtrl.twitterUserList.bind(twCtrl));

module.exports = router;