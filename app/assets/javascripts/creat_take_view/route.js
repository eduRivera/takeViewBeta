$(document).ready(function(){
	var form = document.getElementsByTagName("form")[0];

	$("#nav-next").click(function () {
		var inputName = document.getElementById("name");
		if (inputName.value != ""){
			form.submit();
		}
	});
	
});