﻿function toggleMCQOptions() {
	var e = document.getElementById('examType');
	if (e.value == "MCQ") {
		document.getElementById('mcq-option1').style.display = 'block';
		document.getElementById('mcq-option2').style.display = 'block';
	}
	else {
		document.getElementById('mcq-option1').style.display = 'none';
		document.getElementById('mcq-option2').style.display = 'none';
	}
}

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

		    //console.log(data[i].DateTime);
            //Taking the date from the DB of the comment
		    commentDateTime = new Date(parseInt(data[i].DateTime.replace("/Date(", "").replace(")/", ""), 10));
            //Getting the current Date/Time
		    currentDateTime = new Date();
		    //console.log(currentDateTime);
            //Minusing the 2 gives us the milliseconds difference
		    var mSecDiff = currentDateTime - commentDateTime;
            //Getting the seconds difference.
		    var secDiff = mSecDiff / 1000;
		    if (secDiff > 60) {
		        //Number of days.
		        var Days = Math.floor(secDiff / 60 / 60 / 24);
		        //Removing the number of days from secDiff in Seconds.
		        secDiff -= Days * 60 * 60 * 24;

		        //console.log(Days, secDiff, commentDateTime, currentDateTime); //Uncomment to check stuff ;)
		        var Hours = Math.floor(secDiff / 60 / 60);
		        secDiff -= Hours * 60 * 60;

		        var Minutes = Math.floor(secDiff / 60);
		        secDiff -= Minutes * 60;

		        //Assigning remaining seconds to secDiff
		        //var Seconds = Math.floor(secDiff);

                //Removed seconds from the timestamp.
		        //value = Seconds.toString() + " Seconds Ago";
		        value = "";
		        //if statements to make a sentence out of the datetime we got.
		        if (Days == 1) {
		        	value = Days.toString() + " day ago";
		        }
		        else if (Days != 0) {
		            value = Days.toString() + " days ago";
		        }
		        else if (Hours == 1) {
		        	value = Hours.toString() + " hour ago";
		        }
		        else if (Hours != 0) {
		            value = Hours.toString() + " hours ago";
		        }
		        else if (Minutes == 1) {
		        	value = +Minutes.toString() + " minute ago";
		        }
		        else if (Minutes != 0) {
		            value = + Minutes.toString() + " minutes ago";
		        }
		        
		        
		    }
		    else {
		        value = "just now";
		    }

            //final DateTime is named dateTimeValue
		    dateTimeValue = "posted " + value;


		    //value = new Date(parseInt(data[i].DateTime.replace("/Date(", "").replace(")/", ""), 10));

		    commentString += "<div class='row'><div class='text-center vote-row right-vote-row col-xs-1'><form action='/Exams/AddCommentVote' method='post'><input type='hidden' name='QuestionId' value='" + id + "' /><input type='hidden' name='AnswerId' value='" + data[i].Id + "' /><input type='hidden' name='TypeOfVote' value='Up' /><input type='submit' name='submit' class='btn vote-submit-button upvote-submit-button btn-default submit-button' value='▲' /></form>" + data[i].VoteCount + "<form action='/Exams/AddCommentVote' method='post'><input type='hidden' name='QuestionId' value='" + id + "' /><input type='hidden' name='AnswerId' value='" + data[i].Id + "' /><input type='hidden' name='TypeOfVote' value='Down' /><input type='submit' name='submit' class='btn btn-default vote-submit-button downvote-submit-button submit-button' value='▼' /></form></div><div class='answer-row col-xs-10'>" + data[i].Content + " <div class='comment-timestamp'>" + dateTimeValue + "</div> </div></div>"
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

function showSomething() {
	console.log("bananas!")
}

$(".answer-div").click(function () { console.log("you clicked the div") });

/*$(function () {
    $("#examType").change(function () {
        var val = $(this).val();
        if (val = "MCQ") {
            $("#MCQ_Format").show();
            $("#MCQ_Number_Of_Questions").show();
        } else {
            $("#MCQ_Format").hide();
            $("#MCQ_Number_Of_Questions").show();
        }
    }), trigger('change');
});*/