using Newtonsoft.Json;
using System;

namespace APIServer.Riot
{
    public struct League
    {
        [JsonProperty("leagueId")] public String LeagueId { get; set; }
        [JsonProperty("summonerId")] public String SummonrId { get; set; }
        [JsonProperty("summonerName")] public String SummonrName { get; set; }
        [JsonProperty("queueType")] public String QueryType { get; set; }
        [JsonProperty("tier")] public String Tier { get; set; }
        [JsonProperty("rank")] public String Rank { get; set; }
        [JsonProperty("leaguePoints")] public Int32 LeaguePoints { get; set; }
        [JsonProperty("wins")] public Int32 Wins { get; set; }
        [JsonProperty("losses")] public Int32 Losses { get; set; }
        [JsonProperty("hotStreak")] public Boolean HotStreak { get; set; }
        [JsonProperty("veteran")] public Boolean Veteran { get; set; }
        [JsonProperty("freshBlood")] public Boolean FreshBlood { get; set; }
        [JsonProperty("inactive")] public Boolean Inactive { get; set; }
    }
}
