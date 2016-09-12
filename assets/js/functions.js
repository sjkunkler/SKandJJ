
/* Background Images
-------------------------------------------------------------------*/
var  pageTopImage = jQuery('#home').data('background-image');
var  weddingImage = jQuery('#wedding').data('background-image');
var  aboutImage = jQuery('#about').data('background-image');
var  subscribeImage = jQuery('#subscribe').data('background-image');
var  contactImage = jQuery('#contact').data('background-image');

if (pageTopImage) {  jQuery('#home').css({ 'background-image':'url(' + pageTopImage + ')' }); };
if (weddingImage) {  jQuery('#wedding').css({ 'background-image':'url(' + weddingImage + ')' }); };
if (aboutImage) {  jQuery('#about').css({ 'background-image':'url(' + aboutImage + ')' }); };
if (subscribeImage) {  jQuery('#subscribe').css({ 'background-image':'url(' + subscribeImage + ')' }); };
if (contactImage) {  jQuery('#contact').css({ 'background-image':'url(' + contactImage + ')' }); };

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
		if ($('body').scrollTop() > 0 && scroll == 'true') {
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




	/* Time Countdown 
	-------------------------------------------------------------------*/
	$('#time_countdown').countDown({
        
        targetDate: {
            'day': 14,
            'month': 10,
            'year': 2017,
            'hour': 5,
            'min': 0,
            'sec': 0
        },
        omitWeeks: true

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

        //$('#contact-submit').hide();
        //$('#contact-loading').fadeIn();
        $('.contact-error-field').fadeOut();


      // Disable submit button just after the form processed 1st time successfully.
      //$('#contact-submit').attr({'disabled' : 'true', 'value' : 'Sending' });

      /* Post Ajax function of jQuery to get all the data from the submission of the form as soon as the form sends the values to email.php*/
      // $.post("php/contact.php", $("#contact-form").serialize(),function(result){
      //   //Check the result set from email.php file.
      //   if(result == 'sent'){



      //     //If the email is sent successfully, remove the submit button
      //     $('#first_name').remove();
      //     $('#last_name').remove(); 
      //     $('#contact_email').remove();
      //     $('#subject').remove(); 
      //     $('#message').remove();
      //     $('#contact-submit').remove(); 

      //     $('.contact-box-hide').slideUp();
      //     $('.contact-message').html('<i class="fa fa-check contact-success"></i><div>Your message has been sent.</div>').fadeIn();
      //   } else {
      //     $('.btn-contact-container').hide();
      //     $('.contact-message').html('<i class="fa fa-exclamation contact-error"></i><div>Something went wrong, please try again later.</div>').fadeIn();
            
      //   }
      // });

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
 

	/* Contact End
	-------------------------------------------------------------------*/


    

    



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
   
