using System;

namespace APIServer.Matching
{
    public class MatchingUser
    {
        public readonly String SummonerId;
        public readonly MatchingRole Role;

        public MatchingUser(String summonerId, MatchingRole role)
        {
            SummonerId = summonerId;
            Role = role;
        }
    }
}
