using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Comments
{
    [Route("[controller]")]
    public class CommentsController : Controller
    {
        private readonly ICommentService _commentService;
        private readonly IMapper _mapper;
        private UserManager<ApplicationUser> _userManager;

        public CommentsController(
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            ICommentService commentService
             )
        {
            _userManager = userManager;
            _mapper = mapper;
            _commentService = commentService;
        }

        [HttpGet("{ids}")]
        public async Task<IEnumerable<CommentViewModel>> Get(string ids,int? skip = null, int? take = null)
        {

            var questionIds = ids.Split(',').Select(a => int.Parse(a)).ToList();
            var userId = _userManager.GetUserId(User);
            
            var comments = _commentService.Get(questionIds, userId);
               
            if(skip != null && take != null)
            {
                comments = comments
                    .Skip((int)skip)
                    .Take((int)take);
            }

            var t = await comments.ToListAsync();
            return t;
        }
    }
}
