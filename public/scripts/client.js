// Creates framework to append new tweets to using jQuery and syntax literals.
$(document).ready(function () {
	const createTweetElement = function (tweet) {
		const layout = `
		<article id='tweeter-container'>
		<div class="tweet-container">
			<div class="tweet-items">
				<div class="user-attributes">
					<div class="user-id">
						<img id="avatar" src="${tweet.user.avatars}" />
							<div>	<h4 id="name">${tweet.user.name}</h4></div>
					</div>
					<div class="user-handle"><h4 id="handle">${tweet.user.handle}</h4></div>
				</div>
				<div class="tweet-content">
					<p id="tweet">${tweet.content.text}</p>
				</div>
				<div class="below-tweet">
					<div class="time-created">${timeago.format(tweet.created_at)}</div>
					<div class="favicons">
						<i id="flag" class="fas fa-flag"></i>
						<i id="retweet" class="fas fa-retweet"></i>
						<i id="heart" class="fas fa-heart"></i>
					</div>
				</div>
			</div>
			</div>
		</div>
	</article>`;

		return layout;
	};

	// Renders news tweets, appends them to above framework.
	const renderTweets = function (tweets) {
		for (tweeter of tweets) {
			$("#tweeter-container").prepend(createTweetElement(tweeter));
		}
	};

	// Submits form with jQuery.
	$("form").on("submit", (evt) => {
		evt.preventDefault();

		//Validates tweets using two conditionals.
		const errorMsg = $(".error-message");
		const counterError = $(".counter");

		//Returns error message if there is nothing in form field.
		if (counterError.val() >= 140) {
			errorMsg.text("Your message should contain text.");
			errorMsg.fadeIn(1000).delay(1000).fadeOut(1000);
			$("form").trigger("reset");
		}

		// Returns error message if tweet is over character limit.
		if (counterError.val() <= 0) {
			errorMsg.text("Your message has too many characters.");
			errorMsg.fadeIn("slow").delay(2000).fadeOut("slow");

			// Resets counter accordingly
			$(".counter").get(0).reset();
		}

		// POST handler.
		const param = $("#tweet-text").serialize();
		$.post("/tweets", param).then(() => {
			loadTweets();
		});
		$("form").trigger("reset");
		$(".counter").text(140);
	});

	// GET handler.
	const loadTweets = function () {
		$.get("/tweets").then((tweet) => {
			console.log(tweet);
			renderTweets(tweet);
		});
	};
	loadTweets();
});
