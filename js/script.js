$(document).ready(function(){
  $('.slider__cert_items').slick({
      dots: true,
      dotsClass: 'slider__cert_dots',
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3500,
      responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          }
        ]
    });
    
    window.addEventListener('DOMContentLoaded', () => {
      const menu = document.querySelector('.header__nav'),
      menuItem = document.querySelectorAll('.header__nav_item'),
      hamburger = document.querySelector('.hamburger');
  
      hamburger.addEventListener('click', () => {
          hamburger.classList.toggle('hamburger_active');
          menu.classList.toggle('header__nav_active');
      });
  
      menuItem.forEach(item => {
          item.addEventListener('click', () => {
              hamburger.classList.toggle('hamburger_active');
              menu.classList.toggle('header__nav_active');
          })
      })
  });  

  $('[data-model=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });
  $('.plan_button').each(function(i) {
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.plan__item_header').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: {
          required: true,
          minlength: 10
        }
      },
      messages: {
        name: "Будь ласка, напишіть своє ім'я",
        phone: {
          required: "Будь ласка, напишіть ваш номер телефону",
          phone: "Невірно введений номер",
          minlength: "повинно бути мінімум 10 цифр"
        }
      }
  });

  };


  valideForms('#consultation form');
  valideForms('#order form');

  $('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset')
    });
    return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
  });

});