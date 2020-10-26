using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;

namespace APIServer.Exception
{
    public class WebResponseException : System.Exception
    {
        public readonly Int32 StatusCode;

        public WebResponseException(Int32 status, string message)
            : base(message)
        {
            StatusCode = status;
        }

        public IActionResult HttpRequestResult()
        {
            switch (StatusCode)
            {
                case (int)HttpStatusCode.BadRequest:
                    return new BadRequestResult();
                case (int)HttpStatusCode.Unauthorized:
                    return new UnauthorizedResult();
                case (int)HttpStatusCode.Forbidden:
                    return new ForbidResult();
                case (int)HttpStatusCode.NotFound:
                    return new NotFoundResult();
                case (int)HttpStatusCode.UnsupportedMediaType:
                    return new UnsupportedMediaTypeResult();
                default:
                    return new StatusCodeResult((int)StatusCode);
            }
        }
    }
}
