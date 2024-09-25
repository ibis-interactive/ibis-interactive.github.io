$(document).ready(function(){
   $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
			scrollTop: ($($anchor.attr('href')).offset().top) 
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbarToggler'
  })

$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggler:visible').click();
});

$(".nav-item .nav-link").on("click", function(){
    $(this).parent().addClass('active').siblings().removeClass('active');
 });

 
$(window).on('activate.bs.scrollspy', function(event){
    $(event.relatedTarget).parent().addClass('active').siblings().removeClass('active');
});