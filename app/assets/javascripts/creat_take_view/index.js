$(document).ready(function(){
	var form = document.getElementById("new_point");
	document.getElementById('nav-next').style['pointer-events'] = 'none';
	var goodUpload = document.getElementById("good-upload");
	if (goodUpload){
		document.getElementById('nav-next').style['pointer-events'] = 'auto';
	}
	$("#browse").click(function () {
		if (goodUpload){
			goodUpload.style['opacity'] = 0;
		}
    	$("#file_").click();
	});
	$("#file_").change(function () {
		document.getElementById("loading-gif").style.display = "block";
    	form.submit();
    	
	});
	
});


