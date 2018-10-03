$(document).ready(function(){
  // Add smooth scrolling to all 
  var bp1 = $("#bp1");
  var bp2 = $("#bp2");
  var bp3 = $("#bp3");
  var bp4 = $("#bp4");
  var bp5 = $("#bp5");
  var bp6 = $("#bp6");
  var bp7 = $("#bp7");

  var navElement1 = $("#nav-element-1")
  var navElement2 = $("#nav-element-2")
  var navElement3 = $("#nav-element-3")
  var navElement4 = $("#nav-element-4")
  var navElement5 = $("#nav-element-5")
  var navElement6 = $("#nav-element-6")
  var navElement7 = $("#nav-element-7")

  var moveToTop = $("#move-to-top")
  moveToTop.addClass("move-out-of-window");

  var activeNavElement = navElement1;
  activeNavElement.addClass('active')

  $(".bp-container").on('scroll', function(event) {

    if (bp1.offset().top >= -window.innerHeight*0.4 && bp1.offset().top <= window.innerHeight*0.6 && activeNavElement !== navElement1) {
      activeNavElement.removeClass('active');
      activeNavElement = navElement1;
      activeNavElement.addClass('active');
      moveToTop.addClass("move-out-of-window");
    } else if (bp2.offset().top >= -window.innerHeight*0.4 && bp2.offset().top <= window.innerHeight*0.6 && activeNavElement !== navElement2) {
      activeNavElement.removeClass('active');
      activeNavElement = navElement2;
      activeNavElement.addClass('active');
      moveToTop.removeClass("move-out-of-window");
    } else if (bp3.offset().top >= -window.innerHeight*0.4 && bp3.offset().top <= window.innerHeight*0.6 && activeNavElement !== navElement3) {
      activeNavElement.removeClass('active');
      activeNavElement = navElement3;
      activeNavElement.addClass('active');
    } else if (bp4.offset().top >= -window.innerHeight*0.4 && bp4.offset().top <= window.innerHeight*0.6 && activeNavElement !== navElement4) {
      activeNavElement.removeClass('active');
      activeNavElement = navElement4;
      activeNavElement.addClass('active');
    } else if (bp5.offset().top >= -window.innerHeight*0.4 && bp5.offset().top <= window.innerHeight*0.6 && activeNavElement !== navElement5) {
      activeNavElement.removeClass('active');
      activeNavElement = navElement5;
      activeNavElement.addClass('active');
    } else if (bp6.offset().top >= -window.innerHeight*0.4 && bp6.offset().top <= window.innerHeight*0.6 && activeNavElement !== navElement6) {
      activeNavElement.removeClass('active');
      activeNavElement = navElement6;
      activeNavElement.addClass('active');
    } else if (bp7.offset().top >= -window.innerHeight*0.4 && bp7.offset().top <= window.innerHeight*0.6 && activeNavElement !== navElement7) {
      activeNavElement.removeClass('active');
      activeNavElement = navElement7;
      activeNavElement.addClass('active');
    }
  });
});