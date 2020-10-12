import express from 'express';
import riotApi from '../logic/riotApi';
import { UserManager } from '../logic/user';

var router = express.Router();

const sendResponse = function (response, statusCode, sendData) {
    response.header("Access-Control-Allow-Origin", "*");
    response.status(statusCode);
    response.send(sendData);
}

const jsonResponse = function (response, statusCode, jsonData) {
    response.header("Access-Control-Allow-Origin", "*");
    response.status(statusCode);
    response.json(jsonData);
}

router.post('/login', function(request, response) {
    const summonerName = request.body.name;

    riotApi.GetSummonerByName(summonerName, 
        function(summoner) {
            riotApi.GetLeagueBySummoner(summoner.id, 
                function(league) {
                    var enterUser = {
                        id : summoner.id,
                        accountId : summoner.accountId,
                        leagueId: league.leagueId,
                        puuid : summoner.puuid,
                        name : summoner.name,
                        level : summoner.level,
                        tier : league.tier,
                        rank : league.rank,
                    };

                    try {
                        UserManager.Enter(enterUser);
                        request.session.userId = enterUser.id;
                        jsonResponse(response, 200, enterUser);
                    } catch (error) {
                        sendResponse(response, 400, error);
                    }
                },
                function(errResponse) {
                    sendResponse(response, errResponse.statusCode, "failed to get summoner");
                })
        },
        function(errResponse) {
            sendResponse(response, errResponse.statusCode, "failed to get summoner");
        }
    );
});

router.post('/logout', function(request, response) {
    const userId = request.session.userId;
    if (!userId) {
        sendResponse(response, 400, "logout failed");
    }

    try {
        request.session.userId = undefined;
        UserManager.Leave(userId);

        sendResponse(response, 200);
    } catch (error) {
        sendResponse(response, 400, error);
    }
});

module.exports = router;