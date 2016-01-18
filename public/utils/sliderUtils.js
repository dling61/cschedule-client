/***************************************** //
// This Javascript file is created to hold //
// the different general utilities that    //
// affect sliders.                         //
// *****************************************/

// Allows a sliderbox to be inserted after any element with  class="arrowSlideDown"
// Place things into the sliderBox by using $('#blackBox').html('insert here');
$("html").on("click", ".arrowSlideDown", function(e) {
	// target height + distance from top + desired distance from target 
	var topPos = e.target.offsetHeight + e.target.offsetTop + 2;
	// half the target width + distance from left - half the size of the arrow
    var lefPos = (e.target.offsetWidth/2) + e.target.offsetLeft - parseInt($("#arrowUp").css("border-left"));
	// add the locations as css and toggle the display on and off
	$("#arrowUp").css({top:topPos, left:lefPos});
	// insert the sliderBox after the clicked item and display it
	$("#sliderBox").insertAfter(e.target).toggle();
});
