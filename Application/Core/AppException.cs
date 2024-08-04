namespace Application.Core
{
    public class AppException
    {
        //AppException is used to return error responses to the client.
        public AppException(int statusCode, string message, string details = null) 
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}