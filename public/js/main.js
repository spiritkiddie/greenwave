(function ($) {

  "use strict";

  /*----------------------------------|| Loader ||----------------------------------------------*/
  var loader = $('#loader');
  var _window = $(window);
  _window.on('load', function () {
    loader.fadeOut(500);
  });

  /*----------------------------------|| Wow.js Initialization ||----------------------------------------------*/

  new WOW().init();

  /*----------------------------------|| Flex Slider ||----------------------------------------------*/

  _window.on('load', function () {
    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: true,
      easing: 'easeInCubic',
      slideshowSpeed: 24000,
      animationSpeed: 1200,
      pauseOnAction: true,
      touch: true,
      keyboard: true,
      after: function (slider) {
        $('.flex-active-slide').find('.flex-caption').hide().delay(0).show(0).addClass('animated');
      },
      before: function (slider) {
        $('.flexslider').find('.flex-caption').fadeOut(200).removeClass('animated');
        $('.flex-active-slide').find('.flex-caption').css('transform', '');
      }

    });


    $('.testimonial').flexslider({
      animation: "slide",
      animationLoop: false,
      itemMargin: 5,
      minItems: 1,
      directionNav: false,
      pauseOnAction: true,
      slideshowSpeed: 3000,
      animationSpeed: 800,
      maxItems: 1
    });

    $('.clients').flexslider({
      directionNav: false,
      animation: "slide",
      animationLoop: true,
      pauseOnAction: false,
      itemWidth: 210,
      itemMargin: 5,
      minItems: 2,
      maxItems: 4,
      slideshowSpeed: 4000,
      animationSpeed: 1500
    });

  });

  /*----------------------------------|| On Scroll Method ||----------------------------------------------*/
  var navigation = $('#navigation');
  _window.on('scroll', function () {
    var $scroll_pos = 0;
    var scroll_pos = _window.scrollTop();
    if (scroll_pos >= 30) {
      navigation.addClass('color_navigation');
    } else {
      navigation.removeClass('color_navigation');
    }
  });

  /*----------------------------------|| Mobile Menu ||----------------------------------------------*/

  var navigation_btn = $('.nav-btn-open');
  navigation_btn.on('click', function () {
    if ($(this).hasClass('ti-menu')) {
      navigation.css('height', '100%');
      $(this).removeClass('ti-menu').addClass('ti-close');
    } else {
      navigation.css('height', '80px');
      $(this).removeClass('ti-close').addClass('ti-menu');
    }
  });
  /*----------------------------------|| Lightbox ||----------------------------------------------*/

  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  });

  /*----------------------------------|| Sign in toggle ||----------------------------------------------*/

  // var login_btn = $('#navigation a.login-btn');
  // var signin_popup = $('#signin_box');
  // var signin_popup_cont = signin_popup.find('.signin_cont');
  // var signin_close = signin_popup.find('span.close_btn');

  // login_btn.on('click', function (e) {
  //   e.preventDefault();
  //   if (signin_popup_cont.hasClass('show')) {
  //     signin_popup_cont.removeClass('show');
  //     signin_popup.fadeOut(200);
  //   } else {
  //     signin_popup.fadeIn(200);
  //     signin_popup_cont.addClass('show');
  //   }
  //   return false;
  // });

  // signin_close.on('click', function () {
  //   signin_popup_cont.removeClass('show');
  //   signin_popup.fadeOut(200);
  // });

})(jQuery);

/*----------------------------------|| Modal toggle ||----------------------------------------------*/

var modal_btn = $('button.toggle-modal');
var modal_popup = $('#modals');
var modal_popup_contents = modal_popup.find('.modal-contents');
var modal_close = modal_popup_contents.find('span.close_btn');
var modal_title = modal_popup.find('p.heading_modal');

modal_btn.each(function(){
  let btn = $(this);

  btn.on('click', function(e){
    e.preventDefault();
    var element = $(this);
    var modal_info = element.next('.full-info');
    var modal_heading = element.prev().prev();

    console.log(btn)
  
    if (modal_popup_contents.hasClass('show')) {
      modal_popup_contents.removeClass('show');
      modal_popup.fadeOut(200);
    } else {
      modal_popup.fadeIn(200);
      modal_popup_contents.addClass('show');
      modal_popup_contents.find('.margin-t25').html(modal_info.html());
      modal_title.html(modal_heading.html())
    }
    return false;
  });
});


modal_close.on('click', function () {
  modal_popup_contents.removeClass('show');
  modal_popup.fadeOut(200);
});