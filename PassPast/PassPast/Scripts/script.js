function toggleVisibility(id) {
	var e = document.getElementById(id);
	if (e.style.display == 'block') {
		e.style.display = 'none';
	}
	else {
		e.style.display = 'block';
	}
}

// Updates the right sidebar with the selected question's comments
function viewComments(id) {
	// So the comments appears where the user is on the page. Not responsive, but it wasn't really in the first place
	$.get('GetComments?questionId=' + id, function (data) {
		var scrollPosition = $(window).scrollTop();
		$(".right-sidebar-div").css("margin-top", scrollPosition + "px");
		var commentString = "<h4 class='right-comments'>Comments:</h4>";
		
		for (var i = 0; i < data.length; i++) {
			commentString += "<div class='row'><div class='text-center vote-row right-vote-row col-xs-1'><form action='/Exams/AddCommentVote' method='post'><input type='hidden' name='QuestionId' value='" + id + "' /><input type='hidden' name='AnswerId' value='" + data[i].Id + "' /><input type='hidden' name='TypeOfVote' value='Up' /><input type='submit' name='submit' class='btn vote-submit-button upvote-submit-button btn-default submit-button' value='▲' /></form>" + data[i].VoteCount + "<form action='/Exams/AddCommentVote' method='post'><input type='hidden' name='QuestionId' value='" + id + "' /><input type='hidden' name='AnswerId' value='" + data[i].Id + "' /><input type='hidden' name='TypeOfVote' value='Down' /><input type='submit' name='submit' class='btn btn-default vote-submit-button downvote-submit-button submit-button' value='▼' /></form></div><div class='answer-row col-xs-10'>" + data[i].Content + "</div> <div>"+data[i].Timestamp+"</div></div>"
		};
		commentString += "<div class='row'><div class='vote-row col-xs-1'></div><div class='col-xs-10'><form id='comment-box'><textarea rows='6' name='Content' class='comment' placeholder='Click here to add a comment...'></textarea><br /><input type='hidden' name='QuestionId' value='" + id + "' /><input type='button' name='submit' class='btn btn-default submit-button comment-submit-button' value='add comment' onclick='addComment(" + id + ");' /></form></div></div>";
		
		$(".right-sidebar-div").html(commentString);
	})
}

// Serialize takes all the name="" stuff in the specified item so you can use them as variables with values
function addComment(questionId) {
	$.post('AddComment?' + $('#comment-box').serialize(), function (data) {
		viewComments(questionId);
	})
}