'use strict';

const TwitterClient = require('twitter');
const config = require('../../config.json');
const cachedData = {
    timesCalled: 0,
    cachedTime: 0,
    twitterList: null
};

const client = new TwitterClient({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessToken,
    access_token_secret: config.accessTokenSecret
});

module.exports = {
    twitterUserList
};


function twitterAPICallHelper(res, cached, apiPromise) {
    const MAX_TIMEOUT = 60000;
    const MAX_API_CALLS = 3;
    const currentTime = Date.now();
    const isGreaterTimeout = (currentTime - cachedData.cachedTime) > MAX_TIMEOUT;
    if (cachedData[cached.dataName] && cachedData[cached.dataName][cached.name] && !isGreaterTimeout && cachedData.timesCalled === MAX_API_CALLS) {
        return res.json(cachedData[cached.dataName][cached.name]);
    } else {
        cachedData.timesCalled = cachedData.timesCalled === MAX_API_CALLS ? 0 : cachedData.timesCalled;
        if (isGreaterTimeout || cachedData.timesCalled < MAX_API_CALLS) {
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
    }
    
}

function twitterUserList (req, res) {
    const urlParams = req.params;
    const username = urlParams.username;
    const url = `statuses/user_timeline`;
    const params = {screen_name: username, count: 30};
    return twitterAPICallHelper(res, {dataName: 'twitterList', name: username}, client.get(url, params));
}

    