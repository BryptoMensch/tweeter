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

	const renderTweets = function (tweets) {
		for (tweeter of tweets) {
			$("#tweeter-container").prepend(createTweetElement(tweeter));
		}
	};

	// $(".error-message").hide();

	$("form").on("submit", (evt) => {
		evt.preventDefault();

		const errorMsg = $(".error-message");
		const counterError = $(".counter");

		if (counterError.val() >= 140) {
			errorMsg.text("Your message should contain text.");
			errorMsg.fadeIn(1000).delay(1000).fadeOut(1000);
			$("form").trigger("reset");
		}
		if (counterError.val() <= 0) {
			// $(".counter").trigger("reset");
			errorMsg.text("Your message has too many characters.");
			errorMsg.fadeIn("slow").delay(2000).fadeOut("slow");

			$(".counter").get(0).reset();
		}
		const param = $("#tweet-text").serialize();

		$.post("/tweets", param).then(() => {
			loadTweets();
		});
		$("form").trigger("reset");
		$(".counter").text(140);
	});
	const loadTweets = function () {
		$.get("/tweets").then((tweet) => {
			console.log(tweet);
			renderTweets(tweet);
		});
	};

	loadTweets();
});

// Left to do
// 1. Error Handling
// 2. Warning error VM1009

// $(".error-message").hide("slow");
// const input = $("#tweet-text").val();
// //

// if (input === "") {
// 	$(".error-message").text("Tweets cannot be empty.").show("slow");
// } else if (input.length > 140) {
// 	$(".error-message").text("Tweets cannot be empty.").show("slow");

// //
// .then($("form", "counter").trigger("reset"));

// //
// $(".error-message").hide();
// $(".new-tweet").hide();
