using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            //private readonly ILogger<List> _logger;
            public Handler(DataContext context)
            {
                //_logger = logger;
                _context = context;
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                //try-catch demonstrates that cancellation token is used to cancel the request after user quit the brower, move to another page, long waiting in data retrieving etc.
                // try
                // {
                //     for(var i = 0; i < 10; i++)
                //     {
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000,cancellationToken);
                //         _logger.LogInformation($"Task {i} has completed");
                //     }
                // }
                // catch (System.Exception)
                // {
                    
                //     _logger.LogInformation("Task was cancelled.");
                // }
                return await _context.Activities.ToListAsync();
            }
        }
    }
}