using APIServer.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Net;

namespace APIServer.Controllers
{
    public enum ActionWhenSessionNotFound
    {
        Ignore = 0,
        RedirectToLogin
    }

    public class BaseController : Controller
    {
        private static readonly String SessionIdCookieName = "sessionId";

        protected ActionWhenSessionNotFound mActionWhenSessionNotFound;
        protected ISessionManager mSessionManager;
        protected Session mSession;

        public BaseController(ISessionManager sessionManager)
        {
            mSessionManager = sessionManager;
            mActionWhenSessionNotFound = ActionWhenSessionNotFound.RedirectToLogin;
        }

        protected void CreateNewSession(RiotUser riotUser)
        {
            if (mSession != null)
                mSessionManager.Delete(mSession.SessionId);

            mSession = mSessionManager.Create(Guid.NewGuid(), riotUser);

            Response.Cookies.Append(SessionIdCookieName, mSession.SessionId.ToString());
        }

        private bool RetrieveSession()
        {
            if (Request.Cookies.ContainsKey(SessionIdCookieName) == false)
                return false;

            String sessionId = Request.Cookies[SessionIdCookieName];

            mSession = mSessionManager.Find(Guid.Parse(sessionId));
            return mSession != null;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            if (RetrieveSession() == false)
            {
                switch (mActionWhenSessionNotFound)
                {
                    case ActionWhenSessionNotFound.Ignore:
                        return;
                    case ActionWhenSessionNotFound.RedirectToLogin:
                        context.Result = StatusCode((int)HttpStatusCode.Unauthorized);
                        return;
                }
            }

            mSession.LastAccessTime = DateTime.Now;
        }
    }
}
