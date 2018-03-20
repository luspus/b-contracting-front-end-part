/* ------ _slider  ---- */
$(".slider__gallery").slick({
    autoplay: true,
    loop: true,
    slidesToShow: 1
});

$('.flexslider').flexslider({
    animation: "fade"
});

$('.slick-arrow').empty();

$(".scroll__top").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
        scrollTop: top
    }, "slow");
});

$(".scroll__top").hide();

$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.scroll__top').fadeIn();
    } else {
        $('.scroll__top').fadeOut();
    };

    var headerHeight = $('.header').outerHeight();
    if ($(this).scrollTop() > headerHeight) {
        if(document.documentElement.clientWidth > 575){
            $('.vacancy__filterRow').addClass('vacancy__filterRow-fixed');
            if($('div').is('.vacancy__filterRow')){
                $('.vacancy').addClass('vacancy-fixed');
            };
        }
    } else {
        $('.vacancy__filterRow').removeClass('vacancy__filterRow-fixed');
        if($('div').is('.vacancy__filterRow')){
            $('.vacancy').removeClass('vacancy-fixed');
        };
    };

    var headerLineHeight = $('.header__info').outerHeight();
    if ($(this).scrollTop() > headerLineHeight) {
       $('.header__line').addClass('header-fixed');
       $('.header').addClass('menu__scroll-fixed');
    } else {
        $('.header__line').removeClass('header-fixed');
        $('.header').removeClass('menu__scroll-fixed');
    };
});

if (typeof $.magnificPopup !== "undefined") {
    $('.project__item_img, .gallery__image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
            tCounter: '',
            tPrev: 'Попередня',
            tNext: 'Наступна',
            tClose: 'Закрити (Esc)',
            tLoading: 'Завантаження...',
        }
    });
    $('.video__slide, .video__image, .project__item_video').magnificPopup({
        type: 'iframe',
        tPrev: 'Попередня',
        tNext: 'Наступна',
        tClose: 'Закрити (Esc)',
        tLoading: 'Завантаження...',
        gallery: {
            enabled: true,
            tCounter: ''
        },
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    src: 'h%id%?autoplay=1'
                }
            }
        }
    });
};

$(function () {
    var modal = $('#modal');
    var bg = $('.bg');

    if (modal.length == 1 && bg.length) {
        dataURL = window.location.pathname.split('/');

        bg.on('click', function () {
            $(this).removeClass('bg__darken');
            modal.hide();
        });

        $('form.form__resume').on('submit', function (e) {
            e.preventDefault();
            data = new FormData(document.getElementById('resume'));
            loader = $('#resume').find('.loader');

            $.ajax({
                method: 'POST',
                url: '/'+dataURL[dataURL.length - 4] + '/jobs/' + dataURL[dataURL.length - 2] + '/',
                data: data,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'JSON',
                success: function (response) {
                    if (typeof response.status != undefined && response.status == 'success') {
                        $('#resume').trigger('reset');
                        $('.bg').addClass('bg__darken').delay(1800).fadeOut(500);
                        modal.fadeIn(300).delay(1600).fadeOut(500);
                        $('.error__msg').empty();
                    } else {
                        var errors = response.errors;
                        if (errors.email) {
                            str = '<span>' + errors.email + '</span>';
                            $('.email_error').html(str);
                        } else {
                            $('.email_error').empty();
                        };
                        if (errors.name) {
                            str = '<span>' + errors.name + '</span>';
                            $('.name_error').html(str);
                        } else{
                            $('.name_error').empty();
                        };
                        if (errors.surname) {
                            str = '<span>' + errors.surname + '</span>';
                            $('.surname_error').html(str);
                        } else{
                            $('.surname_error').empty();
                        };
                        if (errors.phone_number) {
                            str = '<span>' + errors.phone_number + '</span>';
                            $('.phone_number_error').html(str);
                        } else{
                            $('.phone_number_error').empty();
                        };
                        if (errors.docfile) {
                            if (dataURL[dataURL.length - 4] == 'uk'){
                                str = '<span>' + 'Непідтримуваний формат файлу'  + '</span>';
                                $('.docfile_error').html(str);
                            }
                            if (dataURL[dataURL.length - 4] == 'pl'){
                                str = '<span>' + 'Nieobsługiwany format pliku'  + '</span>';
                                $('.docfile_error').html(str);
                            }
                            if (dataURL[dataURL.length - 4] == 'en'){
                                str = '<span>' + 'Unsupported file format'  + '</span>';
                                $('.docfile_error').html(str);
                            }
                        } else{
                            $('.docfile_error').empty();
                        };
                    }
                }
            });
        });
    };

    function resize() {
        var footerHeight = $('footer').innerHeight();
        $('.main__container').css({ 'padding-bottom': 'calc(0px + ' + footerHeight + 'px'});
    };

    resize();

    $( window ).resize(function() {
        resize();
    });

    var arr = location.pathname.split('/'),
        langActive = arr[1];
    if(langActive == "uk") {
        $('.map').toggleClass('map-ua')
    } else if(langActive == "en") {
        $('.map').toggleClass('map-en')
    } else if(langActive == "pl") {
        $('.map').toggleClass('map-pl')
    }
});

$(".file-upload input[type=file]").change(function() {
    var filename = $(this).val().replace(/.*\\/, "");
    $("#filename").val(filename);
});

$('.header__button').on('click', function(){
    $(this).toggleClass('header__button-active');
    $('.header__menuBody').toggleClass('header__mobmenu');
    $('.bg').toggleClass('bg__darken');
    $('.header').toggleClass('header-relative');
});

$('.submenu__block').on('click', function(){
    $('.submenu__block .submenu').toggleClass('submenu-active');
});

$('#active__lang').on('click',function(){
    $('.content').toggle();
    $('#active__lang').toggleClass('active__lang-click')
});

$(document).mouseup(function (e) {
    if ($(".lang__body").has(e.target).length === 0){
        $('.header__info .lang__body .content').hide();
        $('#active__lang').removeClass('active__lang-click');
    }
});