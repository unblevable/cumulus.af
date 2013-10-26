$(document).ready(function() {
	$('.upload').click(function() {
		$('.uploader').click();
		$('.uploader').change(function() {
			$(this).parent().submit();
		});
	});
});