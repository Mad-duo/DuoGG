using APIServer.Riot;
using System;
using System.Threading;

namespace APIServer.Matching
{
    public sealed class MatchingRole
    {
        private static Int32 IssueRoleId = 0;

        public readonly Int32 RoleId;
        public readonly Line MyLine;
        public readonly Line PartnerLine;

        public MatchingRole(Line myLine, Line partnerLine)
        {
            RoleId = Interlocked.Increment(ref IssueRoleId);
            MyLine = myLine;
            PartnerLine = partnerLine;
        }
    }
}
