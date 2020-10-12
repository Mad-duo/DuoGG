'use strict';

import request from 'request';

class Summoner {
    constructor(props) {
        super(props);

        this.accountId = props.accountId;
        this.profileIconId = props.profileIconId;
        this.revisionDate = props.revisionDate;
        this.name = props.name;
        this.id = props.id;
        this.puuid = props.puuid;
        this.level = props.summonerLevel;
    }
}

class League {
    constructor(props) {
        super(props);

        this.leagueId = props.leagueId;
        this.summonerId = props.summonerId;
        this.summonerName = props.summonerName;
        this.queueType = props.queueType;
        this.tier = props.tier;
        this.rank = props.rank;
        this.leaguePoints = props.leaguePoints;
        this.wins = props.wins;
        this.losses = props.losses;
    }
}

exports.GetSummonerByName = function(name, callback, errorCallback) {
    request('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + '?api_key=' + apiKey, function (error, response, body) {
        if (error) {
            errorCallback(response);
            return;
        }

        callback(response, new Summoner(body));
    });
}

exports.GetLeagueBySummoner = function(name, callback, errorCallback) {
    request('https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerId + '?api_key=' + apiKey, function (error, response, body) {
        if (error) {
            errorCallback(response);
            return;
        }

        callback(new League(body));
    });
}