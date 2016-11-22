
/* Background Images
-------------------------------------------------------------------*/
var  pageTopImage = jQuery('#home').data('background-image');
if (pageTopImage) {  jQuery('#home').css({ 'background-image':'url(' + pageTopImage + ')'}); };

/* Background Images End
-------------------------------------------------------------------*/



/* Document Ready function
-------------------------------------------------------------------*/
$(document).ready(function() { 
	"use strict";

	//Animated scrolling		   
	$('ul.mainmenu a').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[id=' + this.hash.slice(1) +']');
			if ($target.length) {
				$('ul.mainmenu li').removeClass('active');
				$(this).parent('li').addClass('active');
				var targetOffset = $target.offset().top-100;
				$('html,body').animate({scrollTop: targetOffset}, 1000);
				return false;
			}
		}
	});
  
	// Scroll Down Link
	$('.scrolldown').click(function() {
		var targetOffset = $('div.blockquote').offset().top-80;
		$('html,body').animate({scrollTop: targetOffset}, 1000);
	});
  
	// Menu Scroll Hide
	var nav = $('.menubar');
	var scroll = $('.menubar').attr('data-scroll');
	$(function(){
		$('.menubar').data('size','big');
		if (scroll == 'false') {
			nav.css({
				marginTop:'0px'
			});
		};
	});
	$(window).scroll(function(){
		if (($('html').scrollTop() > 0 || $('body').scrollTop() > 0) && scroll == 'true') {
			if (nav.data('size') == 'big') {
				nav.data('size','small').stop().animate({
					marginTop:'0px'
				}, 300);
			}
		} else {
			if (nav.data('size') == 'small' && scroll == 'true') {
				nav.data('size','big').stop().animate({
					marginTop:'-80px'
				}, 300);
			}
			
		}

	});


	/* Contact
	-------------------------------------------------------------------*/
    // Email from Validation
  $('#contact-submit').click(function(e){ 

    //Stop form submission & check the validation
    e.preventDefault();


    $('.first-name-error, .last-name-error, .contact-email-error, .contact-rsvp-error').hide();

    // Variable declaration
    var error = false;
    var k_first_name = $('#first_name').val();
    var k_last_name = $('#last_name').val();
    var k_email = $('#contact_email').val(); 
    var k_rsvp = $('#contact_rsvp').val(); 

    // Form field validation
    if(k_first_name.length == 0){
      error = true; 
      $('.first-name-error').html('<i class="fa fa-exclamation"></i> First name is required.').fadeIn();
    }  

    if(k_last_name.length == 0){
      error = true;
      $('.last-name-error').html('<i class="fa fa-exclamation"></i> Last name is required.').fadeIn();
    }  

    if(k_email.length != 0 && validateEmail(k_email)){
       
    } else {
      error = true; 
      $('.contact-email-error').html('<i class="fa fa-exclamation"></i> Please enter a valid email address.').fadeIn();
    }

    if(k_rsvp == null){
      error = true;
     $('.contact-rsvp-error').html('<i class="fa fa-exclamation"></i> Please select an RSVP option.').fadeIn();
    } 

    // If there is no validation error, next to process the mail function
    if(error == false){
        $('.contact-error-field').fadeOut();

      // parameters: service_id, template_id, template_parameters
      emailjs.send("default_service","template_jgINAfrP",{
        from_name: $('#first_name').val() + " " + $('#last_name').val(), 
        message: $('#message').val(), 
        from_email: $('#contact_email').val(), 
        reply_to:$('#contact_email').val(),
        response: $('#contact_rsvp').find(":selected").text()
      })
      .then(function(response) {
        console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        alert('Thank you for your RSVP!');
        $('#first_name').val('');
        $('#last_name').val('');
        $('#contact_email').val('');
        $('#contact_rsvp').val(0);
        $('#message').val('');
      }, function(err) {
        console.log("FAILED. error=", err);
      alert('Oops, something went wrong. Please try again later.');
      });
    }
  });  
 
         
  function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    } else {
      return false;
    }
  } 
 
});

/* Document Ready function End
-------------------------------------------------------------------*/


/* Preloder 
-------------------------------------------------------------------*/
$(window).load(function () {    
    "use strict";
    $("#loader").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
});
 /* Preloder End
-------------------------------------------------------------------*/

(function ($) {
  $.fn.countdown = function (options, callback) {
    //custom 'this' selector
    thisEl = $(this);

    // array of custom settings
    var settings = {
      'date': null,
      'format': null
    };

    // append the settings array to options
    if (options) {
      $.extend(settings, options);
    }

    //create the countdown processing function
    function countdown_proc() {
      var eventDate = Date.parse(settings.date) / 1000;
      var currentDate = Math.floor($.now() / 1000);

      if (eventDate <= currentDate) {
        callback.call(this);
        clearInterval(interval);
      }

      var seconds = eventDate - currentDate;

      var days = Math.floor(seconds / (60 * 60 * 24));
      //calculate the number of days

      seconds -= days * 60 * 60 * 24;
      //update the seconds variable with number of days removed

      var hours = Math.floor(seconds / (60 * 60));
      seconds -= hours * 60 * 60;
      //update the seconds variable with number of hours removed

      var minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      //update the seconds variable with number of minutes removed

      //conditional statements
      if (days == 1) { thisEl.find(".timeRefDays").text("day"); } else { thisEl.find(".timeRefDays").text("days"); }
		    if (hours == 1) { thisEl.find(".timeRefHours").text("hour"); } else { thisEl.find(".timeRefHours").text("hours"); }
		    if (minutes == 1) { thisEl.find(".timeRefMinutes").text("minute"); } else { thisEl.find(".timeRefMinutes").text("minutes"); }
		    if (seconds == 1) { thisEl.find(".timeRefSeconds").text("second"); } else { thisEl.find(".timeRefSeconds").text("seconds"); }

      //logic for the two_digits ON setting
      if (settings.format == "on") {
        days = (String(days).length >= 2) ? days : "0" + days;
        hours = (String(hours).length >= 2) ? hours : "0" + hours;
        minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
        seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
      }

      //update the countdown's html values.
      thisEl.find(".days").text(days);
      thisEl.find(".hours").text(hours);
      thisEl.find(".minutes").text(minutes);
      thisEl.find(".seconds").text(seconds);
    }

    //run the function
    countdown_proc();

    //loop the function
    interval = setInterval(countdown_proc, 1000);
  };

})(jQuery);



//Provide the plugin settings
$("#countdown").countdown({
  //The countdown end date
  date: "14 October 2017 17:00:00",

  // on (03:07:52) | off (3:7:52) - two_digits set to ON maintains layout consistency
  format: "on"
});


function setHeights() {
  var windowHeight = $(window).height();
  $('.slide').height(windowHeight);
}

setHeights();

$(window).resize(function () {
  setHeights();
});

function addSticky() {
  $('.slide').each(function () {
    var scrollerAnchor = $(this).offset().top;
    if (window.scrollY >= scrollerAnchor) {
      $(this).addClass('fix-it');
    } else {
      $(this).removeClass('fix-it');
    }
  });
}

$(window).scroll(function () {
  addSticky();
  
});  