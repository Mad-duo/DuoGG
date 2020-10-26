using APIServer.User;
using System;
using System.Collections.Generic;
using System.Linq;

namespace APIServer
{
    public sealed class Session
    {
        public static readonly int EXPIRE_MIN = 1;

        public Guid SessionId { get; set; }
        public DateTime LastAccessTime { get; set; }
        public RiotUser RiotUser { get; set; }
    }

    public interface ISessionManager
    {
        Session Create(Guid sessionId, RiotUser riotUser);
        Session Find(Guid sessionId);
        bool Delete(Guid sessionId);
    }

    public sealed class SessionManager : ISessionManager
    {
        IServiceProvider mIServiceProvider = null;

        private Object mSync = new Object();
        private Dictionary<Guid, Session> mSessions = new Dictionary<Guid, Session>();

        public SessionManager(IServiceProvider serviceProvider)
        {
            mIServiceProvider = serviceProvider;
        }

        public Session Create(Guid sessionId, RiotUser riotUser)
        {
            lock (mSync)
            {
                if (mSessions.ContainsKey(sessionId) == true)
                {
                    return mSessions[sessionId];
                }

                var session = (Session)mIServiceProvider.GetService(typeof(Session));
                session.SessionId = sessionId;
                session.LastAccessTime = DateTime.Now;
                session.RiotUser = riotUser;

                UserManager.AddUser(riotUser);

                mSessions.Add(sessionId, session);

                return session;
            }
        }

        public Session Find(Guid sessionId)
        {
            RemoveExpiredSession();

            lock (mSync)
            {
                if (mSessions.ContainsKey(sessionId) == false)
                {
                    return null;
                }

                mSessions[sessionId].LastAccessTime = DateTime.Now;

                return mSessions[sessionId];
            }
        }

        public bool Delete(Guid sessionId)
        {
            lock (mSync)
            {
                Session session = Find(sessionId);
                if (session == null)
                {
                    return false;
                }

                UserManager.RemoveUser(session.RiotUser);
                mSessions.Remove(sessionId);

                return true;
            }
        }

        private void RemoveExpiredSession()
        {
            lock (mSync)
            {
                var expiredList = mSessions.Values.ToList().
                    Where(e => e.LastAccessTime < DateTime.Now - new TimeSpan(0, Session.EXPIRE_MIN, 0));

                foreach (var e in expiredList)
                {
                    mSessions.Remove(e.SessionId);
                }
            }
        }
    }
}
