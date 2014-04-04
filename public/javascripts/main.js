
$(function(){
	// Hide Message
	$(".msg-close").click(function(e){
		e.preventDefault();
		$(this).parent(".admin-msg").fadeOut();
	});
	// Top Menu
	$(document).on('click', function(e) {
		var elem = $(e.target).closest('.top-menu-trigger'),
			box  = $(e.target).closest('.top-menu');
	
		if ( elem.length ) {          // the anchor was clicked
			e.preventDefault();       // prevent the default action
			$('.top-menu').toggle(); // toggle visibility
			$('.top-menu-trigger').toggleClass("active");
		}else if (!box.length){       // the document, but not the anchor or the div
			$('.top-menu').hide();   // was clicked, hide it !
			$('.top-menu-trigger').removeClass("active");
		}
    });
  
});