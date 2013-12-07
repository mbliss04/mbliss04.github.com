$(document).ready(function(){

	var skill = [{'name':'office', 'percent':'82%'}, {'name':'adobe', 'percent':'78%'}, {'name':'languages', 'percent':'85%'}, {'name':'htmlcss', 'percent':'90%'}, {'name':'fcp', 'percent':'79%'}, {'name':'spanish', 'percent':'75%'}];

	/* --- Set percentages of each skill set ---*/
	function setPercents() {
		for (i = 0; i < skill.length; i++) {
	        $('#skills ul li' + '#' + skill[i].name).css( {width: skill[i].percent} );
	    }
	}

	setPercents();

    /* --- Get width and height --- */

	var width = $(window).width();
	var height = $(window).height();
    $(window).scroll(function() {
    	width = $(window).width();
		height = $(window).height();
		//console.log('width: ' + width + ' height: ' + height + ' curr at: ' + $(window).scrollTop());
	});

	/* --- jQuery mouseover portfolio section --- */

	$('.viewport').mouseenter(function(e) {
        $(this).children('a').children('img').animate({ height: '220', left: '0', top: '-10', width: '330'}, 100);
        $(this).children('a').children('span').fadeIn(200);
    }).mouseleave(function(e) {
        $(this).children('a').children('img').animate({ height: '200', left: '0', top: '0', width: '300'}, 100);
        $(this).children('a').children('span').fadeOut(200);
    });

    /* --- jQuery mouseover on social icons --- */

    $('#icons a').mouseenter(function(e) {
        var currentId = $(this).attr('id');
        $('#fillme').replaceWith('<span id="fillme">' + currentId + '</span');
        $('#fillme').css({'color':'#d2434b'});
    }).mouseleave(function(e) {
        $('#fillme').replaceWith('<span id="fillme">______</span');
        $('#fillme').css({'color':'#000'});
    });

    /* --- jQuery mouseover skills to show percentage --- */

	$('#skills ul li').mouseenter(function(e) {
		var currentId = $(this).attr('id');
		for (i = 0; i < skill.length; i++) {
	        if (currentId == skill[i].name) {
	        	$('#skills ul li' + '#' + currentId).animate({
	        		backgroundColor: "#9dccb0", 
	        		width: '100%'
	        	}, 300 );
	        }
	    }
    }).mouseleave(function(e) {
    	var currentId = $(this).attr('id');
    	for (i = 0; i < skill.length; i++) {
	        if (currentId == skill[i].name) {
    			$('#skills ul li' + '#' + currentId).animate({
	        		backgroundColor: "#d2434b",
	   				width: skill[i].percent
	   			}, 300 );
    		}
    	}
    });

    /* --- Add opacity change to picture --- */

	$('#picture img').mouseenter(function(e) {
		$(this).animate({
			opacity: '.7'
		}, 300);
    }).mouseleave(function(e) {
		$(this).animate({
			opacity: '1'
		}, 300);
    });


	/* --- Change tagline color based on window location --- */

    var tag1 = $('#header, #tagline').position().top + 8;
    var tag2 = tag1 + 24;
    $(window).scroll(function() {
        if ($(window).width() > 480) {
            if (tag1 <= $(window).scrollTop()) {
            	$('#tagline, #line1').css({'color':'#cfebd9'});
            }
            else {
            	$('#tagline, #line1').css({'color':'#000'});
            }
            if (tag2 <= $(window).scrollTop()) {
            	$('#tagline, #line2').css({'color':'#cfebd9'});
            }
            else {
            	$('#tagline, #line2').css({'color':'#000'});
            }
        }
    });

    /* --- Change opacity of logo if over picture ---

    var starttri = $('#picture').offset().top - 91;
    var endtri = starttri + 285;
    $(window).scroll(function() {
        if ($(window).scrollTop() >= starttri && 
        	$(window).scrollTop() <= endtri) {
        	$('#logo').css({'opacity':'.5'});
        }
        else {
        	$('#logo').css({'opacity':'1'});
        }
    });

    */

	/* --- Scroll to page elements -- */

	$("a[href='#top']").click(function() {
  		$("html, body").animate({ scrollTop: 0 }, "slow");
  			return false;
	});

	$("a[href='#portfolio']").click(function() {
  		$("html, body").animate({ scrollTop: $('#portfolio').offset().top - 70 }, "slow");
  			return false;
	});

	$("a[href='#about']").click(function() {
  		$("html, body").animate({ scrollTop: $('#about').offset().top - 70 }, "slow");
  			return false;
	});

	$("a[href='#social']").click(function() {
  		$("html, body").animate({ scrollTop: $('#social').offset().top - 70 }, "slow");
  			return false;
	});

	$("a[href='#contact']").click(function() {
  		$("html, body").animate({ scrollTop: $('#contact').offset().top - 70 }, "slow");
  			return false;
	});

	/* --- Sticky navigation bar --- */

	var sticky_navigation_offset_top = $('#regular_nav').offset().top - 10;
    $(window).scroll(function() {
        if ($(window).width() > 480) {
    		var scrollHeight = $(window).scrollTop();
    		console.log(sticky_navigation_offset_top);
            if (scrollHeight < sticky_navigation_offset_top) {
            	$('#sticky_navigation').addClass('show');
            } else {
            	$('#sticky_navigation').removeClass('show');
            } 
        }
    });

});