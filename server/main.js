import express from "express";
import request from 'request';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

const apiKey = 'RGAPI-e404dca0-cd65-4736-b124-959adcddf8d5';

function GetSummoner(req,res) {
    const nickname = req.body.name;

    request('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + nickname + '?api_key=' + apiKey, function (error, response, body) {
        if (error || response.statusCode != 200)
        {
            res.header("Access-Control-Allow-Origin", "*");
            res.status(response.statusCode);
            res.send("failed to get summoner");
            return;
        }

        res.header("Access-Control-Allow-Origin", "*");
        res.status(200);
        res.json(body);
    });
}

function Listening (){
    console.log(`Listening on: http://localhost:${PORT}`);
}

app.use(bodyParser.json());

app.post('/getSummoner', GetSummoner);
app.listen(PORT, Listening);