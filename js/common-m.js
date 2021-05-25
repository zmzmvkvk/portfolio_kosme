"use strict";


setDrag('div#main-visual ul.content li');
setDrag('section.info ul li');
if($(window).width() > 1200) {

  function setDrag(selector) {
    var startX = 0;
    var delX = 0;
    var delY = 0;
    var offsetX = 0;
    var isTouched = false;
    var isClickAllowed = true;

    $(selector).on('mousedown touchstart', function (e) {
      e = (e.clientX === undefined) ? e.touches[0] : e;
      startX = e.clientX;
      offsetX = $(this).position().left;
      $(selector).addClass('on');
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
        $(selector).removeClass('on');
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
      if (Math.abs(delX) > 10 || Math.abs(delY) > 10) isClickAllowed = false;
    }
  }
}
