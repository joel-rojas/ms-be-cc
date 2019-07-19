"use strict";

const express = require('express');
const twCtrl = require('./twitter.controller');
const router = express.Router();

router.get('/tweets/', twCtrl.setTwitterClientConfig.bind(twCtrl), twCtrl.getTwitterUserList.bind(twCtrl));

module.exports = router;