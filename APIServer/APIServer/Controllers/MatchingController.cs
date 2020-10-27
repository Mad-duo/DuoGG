using APIServer.Exception;
using APIServer.Matching;
using APIServer.Riot;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MatchingController : BaseController
    {
        private readonly ILogger<MatchingController> mLogger;

        public MatchingController(ISessionManager sessionManager, ILogger<MatchingController> logger)
            : base(sessionManager)
        {
            mLogger = logger;
        }

        [HttpPost("Register")]
        public IActionResult Register(Line myLine, Line partnerLine)
        {
            try
            {
                MatchingRole role = new MatchingRole(myLine, partnerLine);

                MatchingSystem.RegisterUser(mSession, role);

                return Ok();
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

        [HttpPost("Unregister")]
        public IActionResult Unregister()
        {
            try
            {
                MatchingSystem.UnregisterUser(mSession);

                return Ok();
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
