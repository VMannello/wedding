//Globals

var $page2;
var $page3;
var $page4;
var $menu;

//Make it sticky
$('.sticky').Stickyfill();

//Smooth scroll
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 400);
        return false;
      }
    }
  });
});

//RSVP
$(function() {


  clicked = false;
  
  $('.rsvp').click(function(){
        $page2 = $('#page2');
        $page3 = $('#page3');
        $page4 = $('#page4');
        $menu = $('.menu');
        $('#page2').remove();
        $('#page3').remove();
        $('#page4').remove();
        $('.menu').remove();
        $('.mv').slideUp();
        $('.portland').animate({padding:'4vh 0 0 0'});
        $('.mainbg').animate({height:'40vh'}, 1000);
        //Add RSVP DOM
        $('#rsvpContainer').show();

      });

      $('#cancelRSVP').click(function(){
            $('#rsvpContainer').hide();
            $('.mainbg').animate({height:'80vh'}, 1000);
            $('.portland').animate({padding:'0 0 0 0'});
            $('.mv').slideDown();
            $('#page1').after($menu);
            $('.menu').after($page2);
            $('#page2').after($page3);
            $('#page3').after($page4);
            $('a[href*="#"]:not([href="#"])').click(function() {
              if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                  $('html, body').animate({
                    scrollTop: target.offset().top
                  }, 400);
                  return false;
                }
              }
            });
        });

        $('#sendRSVP').click(function(){
          wrong = 0;
          if(!$("input[name='attending']:checked").val()){
            wrong ++;
            $('input[type="radio"] + label').css('box-shadow','0 0 3px #CC0000');
          }
            $("#rsvpContainer > .required").each(function(){
              if ( $(this).val().length !== 0 ) {
                  wrong ++;
                  $(this).css('box-shadow','0 0 3px #CC0000');
              }
            });
          if (wrong === 0) {
            payload = {message:$('#rsvpContainer').serialize()};
            $.post('https://us-central1-themannellos-main.cloudfunctions.net/rsvp-V1', payload, function(d,s) {
                $('#rsvpContainer').html('<h2>RSVP Sent!!</h2>');
                $('.mainbg').animate({height:'75vh'}, 1000, 'swing', function() {
                  $('#rsvpContainer').hide();
                });
                $('.portland').animate({padding:'0 0 0 0'});
                $('.mv').slideDown();
                $('#page1').after($menu);
                $('.menu').after($page2);
                $('#page2').after($page3);
                $('#page3').after($page4);
                $('a[href*="#"]:not([href="#"])').click(function() {
                  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                      $('html, body').animate({
                        scrollTop: target.offset().top
                      }, 400);
                      return false;
                    }
                  }
                });
            } ).fail(function() {
                $('#rsvpContainer').html('<h2>Error...</h2><h3>Try reloading the page and resubmitting.</h3>');
            });

          }

        });

        $('#guestUp').click(function(){
          $("#guestCount").text( parseInt($("#guestCount").text(), 10)+1 );
          $("#attend").after('<input type="text" name="guest'+$("#guestCount").text()+'" class="rsvpText gone required" placeholder="Guests Name"></input>');
        });

        $('#guestDown').click(function(){
          if (parseInt($("#guestCount").text(), 10) > 0) {
            $("input[name='guest"+$("#guestCount").text()+"']").remove();
            $("#guestCount").text( parseInt($("#guestCount").text(), 10)-1 );
          }
          else {
            $("#guestCount").text('0');
          }
        });

        $('#notAttending').click(function(){
          $('.gone').hide();
          $('.gone').hide();
        });
        $('#attending').click(function(){
          $('.gone').show();
          $('.gone').show();
        });

});