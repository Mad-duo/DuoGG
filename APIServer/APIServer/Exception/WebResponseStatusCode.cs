namespace APIServer.Exception
{
    // HttpStatusCode의 마지막 숫자 부터 시작해야함. 겹치면 안됨
    public enum WebResponseStatusCode
    {
        Invalid = 512,
        InvalidArgument,
        AlreadyLoggedIn,
        AlreadyAdded,
        NotFound
    }
}
