"use strict";
$(function(){

  $('a.toggle').on('click', function () {
    $('#wrapper').toggleClass('open');
  });
  $("#gnb ul > li > ul > li:first-child").on("click",function(){
    $(this).toggleClass("on")
  })
  $('#gnb > ul > li').on('click',function() {
    $(this).siblings().removeClass('on')
    $(this).toggleClass('on')
  })
  $('#gnb > ul > li > ul > li > a').on('click',function() {
    event.stopPropagation()
  })

  $("div.job-status > ul > li").on("click",function(){
    $(this).siblings().removeClass("on")
    $(this).addClass("on")
  })


  $("nav#gnb > ul").on("mouseenter",function(){
    $("header#header").addClass("on")
  })
  $("header#header").on("mouseleave",function(){
    $("header#header").removeClass("on")
  })
  $("nav#gnb li.second").on("click",function(){
    $("header#header").addClass("second")
    $("nav#gnb li.second").removeClass("on")
    $(this).addClass("on")
  })


  var numSlide = $('div#main-visual ul.content li').length;
  var slideNow = 0;
  var slidePrev = 0;
  var slideNext = 0;
  showSlide(1);
  $('div#main-visual ul.indicator li a').on('click', function() {
    var index = $('div#main-visual ul.indicator li').index($(this).parent());
    showSlide(index + 1);
  });
  $('div#main-visual p.control a.prev').on('click', function() {
    showSlide(slidePrev);
  });
  $('div#main-visual p.control a.next').on('click', function() {
    showSlide(slideNext);
  });
  function showSlide(n) {
    $('div#main-visual ul.content li').css({'display': 'none'});
    $('div#main-visual ul.content li:eq(' + (n - 1) + ')').css({'display': 'block'});
    $('div#main-visual ul.indicator li').removeClass('on');
    $('div#main-visual ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
    slideNow = n;
    slidePrev = (n <= 1) ? numSlide : n - 1;
    slideNext = (n >= numSlide) ? 1 : n + 1;
  }


  $('div.check-box > a').on('click',function() {
    $(this).siblings().removeClass("on");
    $(this).addClass("on")
  })
  

  $(window).on('scroll', function() {
    let scrollNow = $(document).scrollTop();
    
    if(scrollNow > 200) {
      $('nav#bnb').css({display: 'block'})
    } else {
      $('nav#bnb').css({display: 'none'})
    }
  })
  
$(window).on('resize load',function() {
  if ($(window).width() < 1200) {
    setDrag('section.info ul');
    setDrag('section.qna ul');
    function setDrag(selector) {
      let startX = 0;
      let delX = 0;
      let offsetX = 0;
      let isTouched = false;
      let isClickAllowed = true;

      $(selector).on('mousedown touchstart', function (e) {
        e = (e.clientX === undefined) ? e.touches[0] : e;
        startX = e.clientX;
        offsetX = $(this).position().left;
        isTouched = true;
      }).on('click', function (e) {
        if (isClickAllowed === false) {
          e.preventDefault();
          isClickAllowed = true;
        }
      });
      document.addEventListener('mousemove', move, {
        passive: false
      });
      document.addEventListener('touchmove', move, {
        passive: false
      });
      
      $(document).on('mouseup touchend', function (e) {

        if (isTouched === true) {
          isTouched = false;
        }
      });

      function move(e) {
        if (isTouched === false) return false;
        e.preventDefault();
        e = (e.clientX === undefined) ? e.touches[0] : e;
        delX = e.clientX - startX;
        $(selector).css({
          'left': (offsetX + delX) + 'px',
        });
        if (Math.abs(delX) > 10) isClickAllowed = false;
      }
    }
  }
});

$('a[href="#"]').on('click',function(e) {
  e.preventDefault();
})
})


