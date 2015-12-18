$(document).ready(function(){
	console.log("JQuery & Velocity are ready to roll!");
	/*Display How To Play Instructions*/
	$(".how").click(function(){
		console.log("User clicked on instructions!");
		$(".overlay").fadeIn(1200);
	});
	/*Hide How To Play Instructions*/
	$("a.close").click(function(){
		console.log("User clicked to close instructions!");
		$(".overlay").fadeOut(1200);
	});

	$("h1").velocity("transition.slideUpIn", 2500);
});
