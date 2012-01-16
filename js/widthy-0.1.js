/***********************************************
	
	From Widthy 0.1: Full Width Photosets for Tumblr
	(c) Fred Stevens-Smith (except Tumblr.lightbox code, (c) Tumblr)
	https://github.com/fredsterss/Widthy
	@fredsters_s
	fredstevenssmith.tumblr.com
	
	widthy-0.1.js:
	The code to interpret the dynamic photoset layout, chosen from within the Tumblr dashboard.	

***********************************************/

// Renders existing photoset by id and order
function render_photoset ( id, order ) {
  	
  	// Get the width of the containing div	
	var container_width = $("#" + id).width();
	
	// Array to hold the img order in
	var img_order = new Array();
	
	var counter = 0;
	
	// Transform the order array so that we can use if to set the widths per image, so from [3,1] to 0:3, 1:3, 2:3, 3:1
	for (var i = 0; i < order.length; i++) {
		
		var current_order = order[i];
		for (var j = 0; j < current_order; j++) {
			
			img_order[counter] = current_order;
			counter++;
			
		}
	}
	
	
	// Iterate through photoset divs, setting their width to the calculated amount, and swapping in hires versions if needed
	$("#" + id +" > .photoset_img").each(function(index) {
		
		// Calculate and set width of containing div
		var width = calculate_width( container_width, img_order[index] );
		$(this).css("width", width[0] + "%");
		
		// Clear: left if new row
		if (img_order[index] !== img_order[(index-1)]) {
			$(this).css("clear", "left");
		}
		
		// If the image is larger than 500px, replace lores with hires
		if (width[1] > 500) {
			// Get the hires img url
			var hires = $(this).children(".highres").val();
			// Replace the image
			$(this).children(".image").attr("src", hires);
		}
	});
}

function calculate_width ( width, divisions ) {
	
	// Add 10px to the width so that the images are flush to the right of the container.
	var width_minus_margins = (width) - (divisions * 10);
	var width_of_image = width_minus_margins / divisions;
	var width_as_percentage = (width_of_image / width) * 100;
	
	// Return object with percentage and px sizing.
	return [width_as_percentage, width_of_image];
}
