$(document).ready(function(){

	var skill = [{'name':'office', 'percent':'82%'}, {'name':'adobe', 'percent':'78%'}, {'name':'languages', 'percent':'85%'}, {'name':'htmlcss', 'percent':'90%'}, {'name':'fcp', 'percent':'79%'}, {'name':'spanish', 'percent':'75%'}];

    /* --- jQuery Masonry --- */

    // initialize Masonry
    var $container = $('#container').masonry();

    // layout Masonry again after all images have loaded
    $container.imagesLoaded( function() {
      $container.masonry({
        "itemSelector": '.item',
        "gutter": 10
      });
    });

    /* --- Portfolio hover effects --- */

    $('#container .item a').mouseover( function() {
        itemHeight = ($('.item').height());
        itemWidth = $('.item').width();
        topPad = (.2 * itemHeight);
        itemHeight = (itemHeight - (topPad + 5));
        $(this).children('span').css({
            display:'block', 
            width: itemWidth,
            height: itemHeight,
            paddingTop: topPad
        });
    }).mouseleave(function(){
        $(this).children('span').css({
            display:'none'
        });
    });

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
    		//console.log(sticky_navigation_offset_top);
            if (scrollHeight < sticky_navigation_offset_top) {
            	$('#sticky_navigation').addClass('show');
            } else {
            	$('#sticky_navigation').removeClass('show');
            } 
        }
    });

});