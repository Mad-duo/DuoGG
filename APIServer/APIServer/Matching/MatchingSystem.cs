using APIServer.Riot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace APIServer.Matching
{
    public static class MatchingSystem
    {
        private static Object mSync;
        private static List<MatchingUser> mUsers;
        private static List<MatchingRole> mRoles;
        
        static MatchingSystem()
        {
            mSync = new Object();
            mUsers = new List<MatchingUser>();
            mRoles = new List<MatchingRole>();
        }

        public static void Initialize()
        {
            Task.Factory.StartNew(() => {
                while (true)
                {
                    Thread.Sleep(10);

                    MatchOnce();
                }
            }, TaskCreationOptions.LongRunning);
        }

        public static void RegisterUser(Session session, MatchingRole role)
        {
            if (FindUser(session.RiotUser.Id) != null)
                return;

            MatchingUser matchingUser = new MatchingUser(session.RiotUser.Id, role);

            lock (mSync)
            {
                mUsers.Add(matchingUser);
                mRoles.Add(role);
            }
        }

        public static void UnregisterUser(Session session)
        {
            MatchingUser matchingUser = FindUser(session.RiotUser.Id);
            if (matchingUser == null)
                return;

            lock (mSync)
            {
                mUsers.Remove(matchingUser);
                mRoles.Remove(matchingUser.Role);
            }
        }

        private static MatchingUser FindUser(String summonerId)
        {
            lock (mSync)
            {
                return mUsers.FirstOrDefault(x => x.SummonerId == summonerId);
            }
        }

        private static void MatchOnce()
        {
            lock (mSync)
            {
                
            }
        }
    }
}
