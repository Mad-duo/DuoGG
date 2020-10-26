using Newtonsoft.Json;
using System;

namespace APIServer.Riot
{
    public struct Summoner
    {
        [JsonProperty("id")] public String Id { get; set; }
        [JsonProperty("puuid")] public String Puuid { get; set; }
        [JsonProperty("accountId")] public String AccountId { get; set; }
        [JsonProperty("profileIconId")] public Int32 ProfileIconId { get; set; }
        [JsonProperty("revisionDate")] public Int64 RevisionDate { get; set; }
        [JsonProperty("name")] public String Name { get; set; }
        [JsonProperty("summonerLevel")] public Int32 Level { get; set; }
    }
}
