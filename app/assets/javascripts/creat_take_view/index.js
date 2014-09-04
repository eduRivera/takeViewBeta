$(document).ready(function(){
	var form = document.getElementById("new_point");
	var goodUpload = document.getElementById("good-upload");
	
	$("#browse").click(function () {
		if (goodUpload){
			goodUpload.style['opacity'] = 0;
		}
    	$("#file_").click();
	});
	$("#nav-next").click(function () {
    	form.submit();
	});
	$("#file_").change(function () {
		document.getElementById("loading-gif").style.display = "block";
    	form.submit();

	});
	
});


