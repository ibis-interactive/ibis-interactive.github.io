$(document).ready(function () {
  $('a.page-scroll').bind('click', function (event) {
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

$('.navbar-collapse ul li a').click(function () {
  $('.navbar-toggler:visible').click();
});

$(".nav-item .nav-link").on("click", function () {
  $(this).parent().addClass('active').siblings().removeClass('active');
});


$(window).on('activate.bs.scrollspy', function (event) {
  $(event.relatedTarget).parent().addClass('active').siblings().removeClass('active');
});

function loadComponent(url, elementId) {
  var xhr = new XMLHttpRequest();  // Crear una nueva solicitud HTTP
  xhr.open('GET', url, false);     // 'false' hace que la solicitud sea sincrónica
  xhr.send();                      // Enviar la solicitud

  if (xhr.status === 200) {        // Si la solicitud fue exitosa
    document.getElementById(elementId).innerHTML = xhr.responseText;
  } else {
    console.error("Error al cargar el componente:", xhr.status, xhr.statusText);
  }
}


loadComponent('views/partials/header.html', 'header');
loadComponent('views/partials/footer.html', 'footer');

$.getJSON('./assets/socials.json', function (data) {
  let socials = data.socials;
  socials.forEach(social => {
    let socialHTML = `
      <li class="list-inline-item" id="social_${social.name}">
        <a href="${social.url}" aria-label="${social.aria}">
        <i class="${social.icon}"></i>
        </a>
      </li>
    `;
    $('#socials').append(socialHTML);
  });
});
