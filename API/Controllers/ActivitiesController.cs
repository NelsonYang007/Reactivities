using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //[AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
        // private readonly DataContext _context;
        // private readonly IMediator _mediator;

        // public ActivitiesController(IMediator mediator)
        // {
        //     _mediator = mediator;
        //     //_context = context;
        // }

        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities([FromQuery]ActivityParams param)
        {
            //return await _context.Activities.ToListAsync();
            //return await _mediator.Send(new List.Query());
            return HandlePageResult(await Mediator.Send(new List.Query{Params = param}));
        }
        
        [Authorize]
        [HttpGet("{id}")] //api/acitivities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
           // return await _context.Activities.FindAsync(id);

           //return await Mediator.Send(new Details.Query{Id = id});
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
            // return activity == null ? NotFound() : activity;
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            //return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
            return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
        }
            
        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}