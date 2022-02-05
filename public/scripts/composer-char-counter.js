// Character counter helper function.
// > 140, text turns red. >=, text stays/reverts to regular text color.
$(document).ready(function () {
	$("#tweet-text").on("keyup", function () {
		const maxLength = 140;
		let length = maxLength - $(this).val().length;
		if (length < 0) {
			$(".counter").css("color", "red");
		}
		if (length > 0) {
			$(".counter").css("color", "#c77282");
		}
		return $("output").text(length);
	});
});
