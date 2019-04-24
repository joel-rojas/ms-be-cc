'use strict';

const TwitterClient = require('twitter');
const config = require('../../config.json');

class TwitterController {
    constructor() {
        this.MAX_TIMEOUT = 60000;
        this.MAX_API_CALLS = 3;
        this.cachedData = {
            timesCalled: 0,
            cachedTime: 0,
            twitterList: null
        };
        this.client = new TwitterClient({
            consumer_key: config.consumerKey,
            consumer_secret: config.consumerSecret,
            access_token_key: config.accessToken,
            access_token_secret: config.accessTokenSecret
        });
    }
    twitterAPICallHelper(res, cached, apiPromise) {
        const MAX_TIMEOUT = this.MAX_TIMEOUT;
        const MAX_API_CALLS = this.MAX_API_CALLS;
        const cachedData = this.cachedData;
        const currentTime = Date.now();
        const isGreaterTimeout = (currentTime - cachedData.cachedTime) > MAX_TIMEOUT;
        if (cachedData[cached.dataName] && cachedData[cached.dataName][cached.name] &&
            !isGreaterTimeout && cachedData.timesCalled === MAX_API_CALLS) {
                return res.json(cachedData[cached.dataName][cached.name]);
        }
        cachedData.timesCalled = cachedData.timesCalled === MAX_API_CALLS ? 0 : cachedData.timesCalled;
        return apiPromise.then((data) => {
            if (cached.dataName === 'twitterList') {
                if (!cachedData[cached.dataName]) {
                    cachedData[cached.dataName] = {};
                }
                cachedData[cached.dataName][cached.name] = data;
            }
            cachedData.cachedTime = Date.now();
            cachedData.timesCalled++;
            return res.json(data);
        }).catch(error => res.send(error));
    }
    twitterUserList (req, res) {
        const urlParams = req.params;
        const username = urlParams.username;
        const url = `statuses/user_timeline`;
        const params = {screen_name: username, count: 30};
        return this.twitterAPICallHelper(res, {dataName: 'twitterList', name: username}, this.client.get(url, params));
    }
    
}

module.exports = new TwitterController();

    