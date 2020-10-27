using System;
using System.Collections.Generic;
using System.Linq;

namespace APIServer.Matching
{
    public sealed class MatchingPool
    {
        private Object mSync;
        private List<MatchingUser> mUsers;

        public MatchingPool()
        {
            mSync = new Object();
            mUsers = new List<MatchingUser>();
        }

        public void Push(MatchingUser user)
        {
            lock (mSync)
            {
                if (mUsers.FirstOrDefault(x => x.SummonerId == user.SummonerId) != null)
                    return;

                mUsers.Add(user);
            }
        }

        public void Remove(String summonerId)
        {
            lock (mSync)
            {
                MatchingUser user = mUsers.FirstOrDefault(x => x.SummonerId == summonerId);
                if (user == null)
                    return;

                mUsers.Remove(user);
            }
        }

        public MatchingUser Peek()
        {
            lock (mSync)
            {
                return mUsers.Last();
            }
        }

        public MatchingUser Pop()
        {
            lock (mSync)
            {
                MatchingUser user = mUsers.Last();
                if (user == null)
                    return null;

                mUsers.Remove(user);
                return user;
            }
        }
    }
}
