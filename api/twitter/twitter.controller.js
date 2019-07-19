"use strict";

const async = require('async');
const TwitterClient = require('twitter');

class TwitterController {
    constructor() {
        this.twitterUsers = ['MakeSchool', 'newsycombinator', 'ycombinator'];
        this.MAX_TIMEOUT = 60000;
        this.cachedData = {
            cachedTime: 0,
            twitterList: null
        };
        this.client = null;
    }
    setTwitterClientConfig(req, res, next) {
        const {twitterClient} = req;
        if (this.client === null) {
            this.client = new TwitterClient({
                consumer_key: twitterClient.consumerKey,
                consumer_secret: twitterClient.consumerSecret,
                access_token_key: twitterClient.accessToken,
                access_token_secret: twitterClient.accessTokenSecret
            });
        }
        next();
    }
    getTwitterUserList(req, res) {
        const MAX_TIMEOUT = this.MAX_TIMEOUT;
        const cachedData = this.cachedData;
        const currentTime = Date.now();
        const isGreaterTimeout = (currentTime - cachedData.cachedTime) > MAX_TIMEOUT;
        if (cachedData.twitterList && !isGreaterTimeout) {
            return res.json(cachedData.twitterList);
        }
        const url = `statuses/user_timeline`;
        const apiList = this.twitterUsers.map((user) => 
            async () => await this.client.get(url, {screen_name: user, count: 10})
        );
        async.parallel(apiList, (error, data) => {
            if (error) {
                return res.json({error});
            }
            cachedData.cachedTime = Date.now();
            cachedData.twitterList = [...data[0], ...data[1], ...data[2]];
            return res.json(cachedData.twitterList);
        });
    }
}

module.exports = new TwitterController();

    