// This portion of the code has been taken
// from various online resources and stack overflow
// I don't have the links for sources but I claim no
// right over the following lines of code.

//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);

      // $('a').each(function () {
      //      $(this).removeClass('active');
      //  })
      //  $(this).addClass('active');

       $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');

        event.preventDefault();
    });
});
