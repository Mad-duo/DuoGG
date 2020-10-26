using APIServer.Exception;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;

namespace APIServer.Riot
{
    public static class RiotApi
    {
        private const String DefaultUrl = "https://kr.api.riotgames.com/lol";
        private const String ApiKey = "RGAPI-fa4f9dcf-3876-43a0-92b7-191bbf9a2390";
        private const Int32 RequestTimeout = 1000;

        public static Summoner GetSummoner(String name)
        {
            return RequestToRiot<Summoner>($"/summoner/v4/summoners/by-name/{name}");
        }

        public static League[] GetLeaguesBySummonerId(String summonerId)
        {
            return RequestToRiot<League[]>($"/league/v4/entries/by-summoner/{summonerId}");
        }

        public static T RequestToRiot<T>(String api)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create($"{DefaultUrl}{api}?api_key={ApiKey}");
            request.Method = "GET";
            request.Timeout = RequestTimeout; // 1초

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            {
                HttpStatusCode status = response.StatusCode;
                if (status != HttpStatusCode.OK)
                    throw new WebResponseException((int)status, $"RiotApi Request Error - StatusCode: {status}");

                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    String body = reader.ReadToEnd();

                    return JsonConvert.DeserializeObject<T>(body);
                }
            }
        }
    }
}
