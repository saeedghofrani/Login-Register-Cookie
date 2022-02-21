$(document).ready(function () {
	$(document).on("scroll", function () {
		$(document).scrollTop() > 86 ? $("#banner").addClass("shrink") : $("#banner").removeClass("shrink");
	});
	$('a').click(function (e) {
		$('a').removeClass('active');
		$(this).addClass('active');
	});
	$('#logout').click(function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "http://localhost:4000/logout",
			success: function (response) {
				document.location.href = '/login';
			}
		});
	});
});
