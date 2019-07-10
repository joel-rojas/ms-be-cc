'use strict';

module.exports = function(app, twitterClientParams) {
  
    app.use('/twitter', (req, res, next) => {
      req.twitterClient = twitterClientParams;
      next();
    }, require('./api/twitter'));
  
    app.route('/:url(api|auth|components|app|assets)/*')
     .get((req, res) => res.status(404).send('Not Found'));
  };