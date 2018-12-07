import '../css/home/app.scss';

// window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
require('jquery.easing');
require('bootstrap');
require('owl.carousel');
window.aos = require('aos');

import postAjax from './ajax';


(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  $('#owl-screenshots').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    autoplaySpeed:1000,
    responsive:{
        0:{
            items:3
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
  });

  $('#owl-reviews').owlCarousel({
    loop:true,
    margin:100,
    center: true,
    autoplay:true,
    autoplaySpeed:1000,
    autoplayHoverPause: false,
    mouseDrag: false,
    touchDrag: false,
    responsive:{
        0:{
            items:1
        },
        577:{
            items:3
        },
        992:{
            items:5
        }
    }
  });


  // You can also pass an optional settings object
// below listed default settings
aos.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

document.addEventListener('aos:in:super-duper', ({ detail }) => {
  $('.counter').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },
    {
      duration: 4000,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
        //alert('finished');
      }
    });  
  });  
}, { capture: true, passive: true });

document.addEventListener('aos:out:super-duper', ({detail}) =>{
  $('.counter').each(function(){
      $(this).text('0');
  });
}, { capture: true, passive: true });

})(jQuery);


document.getElementById('eye').addEventListener("click", function(){
  var x = document.getElementById("myInput");
  if (x.type === "password") {
      x.type = "text";
  } else {
      x.type = "password";
  }
}, true);

document.getElementById('login').addEventListener('submit', loginSubmission, true);
document.getElementById('login').addEventListener('keydown', function(e){
  if(!e){var e = window.event;}
  if(e.keyCode == 13){loginSubmission.bind(e)}
});

function loginSubmission(e){
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  
  var validationError = ""; 
  let regExpPassword= /^.{6,}$/;

  if(email == ""){

    validationError = "Por favor inserte un email válido";

  }else if (password == ""){

    validationError += " Por favor inserte contraseña";

  }else if(!regExpPassword.test(password)){

    validationError += " La contraseña debe tener al menos 6 caracteres";

  }else{
    postAjax('https://api.safezoneapp.io/api/account/login', 
            'POST',
            { email , password }, 
            function(data) {
              if(data.token){
                validationError = "Cargando...";
                document.getElementById('error-login').innerText = validationError;
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("name", data.name);
                sessionStorage.setItem("email", email);
                window.location.assign("/map.html");
                
              }else if(data.message_api === "Invalid password or email"){
                console.log(data);
                validationError = "Email o contraseña incorrecta";
                document.getElementById('error-login').innerText = validationError;
              }
            });
  }

  document.getElementById('error-login').innerText = validationError;
};



// 'usuario@usuario.com'
// '123456'


// var data = JSON.stringify({
//   "email": "usuario@usuario.com",
//   "password": "123456"
// });

// var xhr = new XMLHttpRequest();

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     var response = this.responseText;
//     console.log(response);
//     localStorage.setItem("response", response);
//   }
//   window.location.assign("/map");
// });

// xhr.open("POST", "https://api.safezoneapp.io/api/account/login");
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.send(data);
