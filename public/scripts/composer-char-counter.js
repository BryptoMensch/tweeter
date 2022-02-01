$(document).ready(function () {
	$("#tweet-text").on("keyup", function () {
		const maxLength = 140;
		// console.error(this);
		let length = maxLength - $(this).val().length;
		if (length < 0) {
			$(".counter").css("color", "red");
		}
		return $("#character-count").text(length);
	});
});
