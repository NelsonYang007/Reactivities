using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>>
        {
            
        }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            //private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                //_logger = logger;
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
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
                var acitivities = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                
                //var activitesToReturn = _mapper.Map<List<ActivityDto>>(acitivities); //convert list<Activity> to list<ActivityDto>

                return Result<List<ActivityDto>>.Success(acitivities);
            }
        }
    }
}