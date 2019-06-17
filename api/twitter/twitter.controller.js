'use strict';

const TwitterClient = require('twitter');

class TwitterController {
    constructor() {
        this.MAX_TIMEOUT = 60000;
        this.MAX_API_CALLS = 3;
        this.cachedData = {
            timesCalled: 0,
            cachedTime: 0,
            twitterList: null
        };
        this.client = null;
    }
    setTwitterClientConfig(data) {
        if (this.client === null) {
            this.client = new TwitterClient({
                consumer_key: data.consumerKey,
                consumer_secret: data.consumerSecret,
                access_token_key: data.accessToken,
                access_token_secret: data.accessTokenSecret
            });;
        }
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
    twitterUserList(req, res) {
        const {twitterClient, params} = req;
        const url = `statuses/user_timeline`;
        const {username} = params;
        const newParams = {screen_name: username, count: 30};
        this.setTwitterClientConfig(twitterClient);
        return this.twitterAPICallHelper(res, {
                dataName: 'twitterList',
                name: username
            },
            this.client.get(url, newParams)
        );
    }
    
}

module.exports = new TwitterController();

    