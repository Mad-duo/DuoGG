using APIServer.Riot;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace APIServer.User
{
    public sealed class RiotUser : IEquatable<RiotUser>
    {
        #region Properties
        [JsonProperty("id")] public readonly String Id;
        [JsonProperty("puuid")] public readonly String Puuid;
        [JsonProperty("accountId")] public readonly String AccountId;
        [JsonProperty("name")] public readonly String Name;
        [JsonProperty("league")] public IReadOnlyCollection<League> Leagues;
        #endregion

        #region Method
        private RiotUser(Summoner summoner, League[] leagues)
        {
            Id = summoner.Id;
            Puuid = summoner.Puuid;
            AccountId = summoner.AccountId;
            Name = summoner.Name;
            Leagues = leagues;
        }

        public Boolean IsValid()
        {
            return String.IsNullOrEmpty(Id) == false
                && String.IsNullOrEmpty(Puuid) == false
                && String.IsNullOrEmpty(AccountId) == false
                && String.IsNullOrEmpty(Name) == false;
        }

        public override String ToString()
        {
            return $"RiotUser (Id:{Id}, Puuid:{Puuid}, AccountId:{AccountId}, Name:{Name})";
        }

        public bool Equals([AllowNull] RiotUser other)
        {
            return Id == other.Id
                && Puuid == other.Puuid
                && AccountId == other.AccountId;
        }
        #endregion

        #region Static Method
        public static RiotUser Create(Summoner summoner, League[] leagues)
        {
            return new RiotUser(summoner, leagues);
        }
        #endregion
    }
}
