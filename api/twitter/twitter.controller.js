'use strict';

const TwitterClient = require('twitter');
const config = require('../../config.json');
const cachedData = {
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


function twitterAPICallHelper(res, cachedName, apiPromise) {
    const MAX_TIMEOUT = 60000;
    const {cachedTime} = cachedData;
    const currentTime = Date.now();
    const isGreaterTimeout = (currentTime - cachedTime) > MAX_TIMEOUT;
    if (isGreaterTimeout) {
        cachedData.cachedTime = Date.now();
        return apiPromise.then((data) => {
            cachedData[cachedName] = data;
            return res.json(data);
        }).catch(error => res.send(error));
    } 
    return res.json(cachedData[cachedName]);
    
}

function twitterUserList (req, res) {
    const urlParams = req.params;
    const username = urlParams.username;
    const url = `statuses/user_timeline`;
    const params = {screen_name: username, count: 30};
    return twitterAPICallHelper(res, 'twitterList', client.get(url, params));
}

    