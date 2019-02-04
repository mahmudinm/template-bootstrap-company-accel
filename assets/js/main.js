/*--------------------------------------------------------------
# Table Content
	1. preloader
	2. navbar
	3. projects/counter up
	4. testimonals/slick
	5. portfolio
	6. magnific popup
	7. ajax contact form

--------------------------------------------------------------*/


$(document).ready(function(){
	'use strict';

	/*--------------------------------------------------------------
	# Preloader
	--------------------------------------------------------------*/
	$('#preloader').delay(800).fadeOut(); // will fade out the white DIV that covers the website. 
	$('body').delay(800).css({'overflow-x':'hidden'});


	/*--------------------------------------------------------------
	# Navbar shrink on scroll
	--------------------------------------------------------------*/
	$(window).scroll(function(){
		if ($(document).scrollTop() > 35) {
			$('#navbar').addClass('shrink');
			$('.navbar-default .navbar-nav>li>a').css('color', '#555');;
			$('.navbar-default .navbar-brand').css('color', '#555');;
		    if (window.matchMedia('(max-width: 767px)').matches) {
		    	$('.dropdown-menu > li > a').css('color', '#555');;
		    } 
		} else {
			$('#navbar').removeClass('shrink');
			$('.navbar-default .navbar-nav>li>a').css('color', '#fbfbf2');;
			$('.navbar-default .navbar-brand').css('color', '#fbfbf2');;
		    if (window.matchMedia('(max-width: 767px)').matches) {
		 	   $('.dropdown-menu > li > a').css('color', '#fbfbf2');;
		    } 
		}
	});

	/*--------------------------------------------------------------
	# Projects / Counter up
	--------------------------------------------------------------*/
    $('.counter').counterUp({
	    delay: 15,
	    time: 3000
	});

	/*--------------------------------------------------------------
	# Testimonals / Slick
	--------------------------------------------------------------*/
	$('.testimonals__slick').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		prevArrow: '<div class="slick-prev slick-nav-btn"><i class="fa fa-angle-left fa-2x"></i></div>',
		nextArrow: '<div class="slick-next slick-nav-btn"><i class="fa fa-angle-right fa-2x"></i></div>',
        autoplaySpeed: 4000,
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1,
		        infinite: true,
		      }
		    }
		  ]
	});

    /*--------------------------------------------------------------
    # Portfolio
    --------------------------------------------------------------*/
		// get the action filter option item on page load
	var $filterType = $('#filter li.active a').attr('class');

	// get and assign the portfolio element to the
	// $holder varible for use later
	var $holder = $('ul.portfolio_gallery');

	// clone all items within the pre-assigned $holder element
	var $data = $holder.clone();

	$('#filter li a').on('click', function(e) {
	    // reset the active class on all the buttons
	    $('#filter li').removeClass('active');
	    
	    // assign the class of the clicked filter option
	    // element to our $filterType variable
	    var $filterType = $(this).attr('class');
	    $(this).parent().addClass('active');
	    
	    if ($filterType == 'all') {
	        // assign all li items to the $filteredData var when
	        // the 'All' filter option is clicked
	        var $filteredData = $data.find('li');
	    } 
	    else {
	        // find all li elements that have our required $filterType
	        // values for the data-type element
	        var $filteredData = $data.find('li[data-type=' + $filterType + ']');
	    }
	    
	    // call quicksand and assign transition parameters
	    $holder.quicksand($filteredData, {
	        duration:600,
	        easing: 'easeInOutQuad'
	    });
	    return false;
	});

	/*--------------------------------------------------------------
	# Magnific Popup
	--------------------------------------------------------------*/
	$('.info').magnificPopup({
		type: 'image',
		gallery:{
			enabled:true
		}
	});

	/*--------------------------------------------------------------
	# Ajax contact form
	--------------------------------------------------------------*/
	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('#form-message');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('alert alert-danger');
			$(formMessages).addClass('alert alert-success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('alert alert-success');
			$(formMessages).addClass('alert alert-danger');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});
			
});