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
		console.log(tweets);
		for (tweeter of tweets) {
			console.log(tweeter);
			$("#tweeter-container").prepend(createTweetElement(tweeter));
		}
	};

	const loadTweets = function () {
		$.get("/tweets").then((tweet) => {
			renderTweets(tweet);
		});
	};

	$("form").on("submit", (evt) => {
		evt.preventDefault();
		const param = $("#tweet-text").serialize();
		$.post("/tweets", param).then(() => {
			loadTweets();
		});
		$("form").trigger("reset");
	});
	loadTweets();
});

// Left to do
// 1. Error Handling
// 2.
