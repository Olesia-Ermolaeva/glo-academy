$(document).ready(function () {
  var modal = $('.modal'),
      modalBtn = $('[data-toggle="modal"]'),
      closeBtn = $('.modal__close'),
      modalSuccess = $ ('.modal__success'),
      successCloseBtn = $('.modal__success__close');

  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  closeBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  successCloseBtn.on('click', function () {
    modalSuccess.toggleClass('modal__success--visible');
  });

  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  next.css('left', prev.width() + 10 + bullets.width() + 10)
  bullets.css('left', prev.width() + 10)

  new WOW().init();

  //плавная прокрутка вверх
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        if ($('#upbutton').is(':hidden')) {
            $('#upbutton').css({opacity : 1}).fadeIn('slow');
        }
    } else { $('#upbutton').stop(true, false).fadeOut('fast'); }
  });
  $('#upbutton').click(function() {
    $('html, body').stop().animate({scrollTop : 0}, 300);
  });

  //валидация формы модального окна
  $('.modal__form').validate({
    errorClass: "invalid",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
      },
      userPhone: "required",
      // правило-объект
      userEmail: {
        required: true,
        email: true
      }
    }, //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Имя не короче двух букв" 
      }, 
      userPhone: "Телефон обязателен",
      userEmail: {
        required: "Обязательно укажите email",
        email: "Введите в формате: name@domain.com"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          modal.removeClass('modal--visible');
          $('.modal__success').addClass('modal__success--visible');
        },
        error: function (response) {
          console.error('Ошибка запроса' + response);
        }
      });
    }  
  });

  // валидация формы онлайн-контроль
  $(".control__form").validate({
    errorClass: "invalid",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
      },
      userPhone: "required",
    }, //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Имя не короче двух букв" 
      }, 
      userPhone: "Телефон обязателен",
    }  
  });

  $("#footerForm").validate({
    errorClass: "invalid",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
      },
      userPhone: "required",
    }, //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Имя не короче двух букв" 
      }, 
      userPhone: "Телефон обязателен",
    }  
  });

  // маска для телефона
  $('[type=tel]').mask('+7(000) 00-00-000', {placeholder: "+7 (___) __-__-___"});

  // создание yandex карты
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [47.244729, 39.723187],
      zoom: 15
      }),

    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Наш офис',
        balloonContent: 'Вход со двора'
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/map-marker.png',
        // Размеры метки.
        iconImageSize: [32, 32],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38]
    });


  });
});
