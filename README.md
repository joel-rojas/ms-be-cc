# Twitter API Server

This REST API back-end app works as a server for [twitter posts app](https://joel-rojas.github.io/twitter-posts-app) implemented by me. It uses a single Twitter API endpoint to get twitter posts from an specific user.

## Features

* It is deployed in a DigitalOcean Droplet and LoadBalancer to enable the app to be opened on HTTPS protocol; plus, it uses DigitalOcean Load Balancer SSL certification tool to setup custom SSL certificates that enables encrypted data transference between the app server and the front-end app.

* It integrates Nginx web server to reverse proxy the server URL with default app's URL and to force it to connect through HTTPS protocol.

* By the use of the DigitalOcean Load Balancer, the app's IP is set as a A-type DNS record with my personal domain: `twserver.emersonrojas.com` as name and Load Balancer's IP as value.

* This app is implemented using Express.js to handle the API routing configuration and twitter API client configuration.

* Uses dotenv npm package to import environment variables for the app like Twitter client API keys and server url + port values.

As for to-do list, some stuff could be made in the app:

* Use of `PM2`, `Forever` or `Nodemon` npm packages to let the app keep running forever no matter if it somehow throws runtime errors and it could turn off automatically.

* Integrate bundling tools like `webpack` to let the app be built with custom production/development rules like minifying the code, using ES6 or Typescript syntax, etc.

* Use of unit testing by installing tools like `jest` to test the API endpoint as for example.

## Tech Stack

* Node.js
* Express.js
* Twitter client API
* DotEnv

## Setup and Usage

Before cloning the app, make sure you have installed [Node.js 8.x](https://nodejs.org/en/download/releases/) version and also to get [developer login credentials](https://developer.twitter.com/) to use Twitter APIs. **Note**: To get it run locally and without HTTPS protocol, these Twitter client API keys and server values have to be set in a `.env` file within the root folder of the app:

```text
    CONSUMER_KEY = "{CONSUMER_KEY}"
    CONSUMER_SECRET = "{CONSUMER_SECRET}"
    ACCESS_TOKEN = "{ACCESS_TOKEN}"
    ACCESS_TOKEN_SECRET = "{ACCESS_TOKEN_SECRET}'"
    SERVER_URL = "127.0.0.1"
    SERVER_PORT = "7890"
```

Finally, run a development server with the following command: `npm run start`

## License

MIT license - 2019 Emerson Joel Rojas Soliz
