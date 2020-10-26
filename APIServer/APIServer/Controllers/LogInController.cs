using APIServer.Exception;
using APIServer.Riot;
using APIServer.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;

namespace APIServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogInController : BaseController
    {
        private readonly ILogger<LogInController> mLogger;

        public LogInController(ISessionManager sessionManager, ILogger<LogInController> logger)
            : base(sessionManager)
        {
            mLogger = logger;
            mActionWhenSessionNotFound = ActionWhenSessionNotFound.Ignore;
        }

        [HttpPost]
        public IActionResult Login(String name)
        {
            try
            {
                if (String.IsNullOrEmpty(name))
                    throw new WebResponseException((int)WebResponseStatusCode.InvalidArgument, $"UserController.Login name argument is null or empty");

                if (mSession != null && mSession.RiotUser != null)
                    throw new WebResponseException((int)WebResponseStatusCode.AlreadyLoggedIn, $"UserController.Login alreay logged in - {mSession.RiotUser}");

                Summoner summoner = RiotApi.GetSummoner(name);
                League[] leagues = RiotApi.GetLeaguesBySummonerId(summoner.Id);
                RiotUser newUser = RiotUser.Create(summoner, leagues);

                CreateNewSession(newUser);

                return new JsonResult(JsonConvert.SerializeObject(newUser));
            }
            catch (WebResponseException e)
            {
                mLogger.LogError(e.Message);

                return e.HttpRequestResult();
            }
            catch (System.Exception e)
            {
                mLogger.LogError(e.Message);

                return BadRequest();
            }
        }
    }
}