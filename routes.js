'use strict';

module.exports = function(app, twitterClientParams) {

    app.use('*', (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET");
      res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      next();
    });
  
    app.use('/twitter', (req, res, next) => {
      req.twitterClient = twitterClientParams;
      next();
    }, require('./api/twitter'));
  
    app.route('/:url(api|auth|components|app|assets)/*')
     .get((req, res) => res.status(404).send('Not Found'));
  };