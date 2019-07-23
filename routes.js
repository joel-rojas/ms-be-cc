'use strict';
const timeout = require('connect-timeout');

module.exports = function(app, twitterClientParams) {
    app.use('/twitter', timeout('5s'), (req, res, next) => {
      req.twitterClient = twitterClientParams;
      next();
    }, require('./api/twitter'));
  
    app.route('/:url(api|auth|components|app|assets)/*')
     .get((req, res) => res.status(404).send('Not Found'));
  };