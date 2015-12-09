$(document).ready(function(){
	console.log("Ready!");
	/*Display How To Play Instructions*/
	$(".how").click(function(){
		$(".overlay").fadeIn(1200);
	});
	/*Hide How To Play Instructions*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1200);
	});
});
