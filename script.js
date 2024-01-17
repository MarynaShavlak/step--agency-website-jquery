$(document).ready(function () {
  const achievementsSection = $('.section--achievements');
  const achievementsList = $('.achievement-value');

  if (isElementInViewport(achievementsSection)) {
    startCounterAnimation();
  }

  $(window).on('scroll', function () {
    if (isElementInViewport(achievementsSection)) {
      startCounterAnimation();
      $(window).off('scroll');
    }
  });

  function isElementInViewport(element) {
    const rect = element[0].getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function startCounterAnimation() {
    achievementsList.each(function () {
      $(this)
        .prop('Counter', 0)
        .animate(
          {
            Counter: $(this).text(),
          },
          {
            duration: 5000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            },
          },
        );
    });
  }

  function clearSearchBar() {
    $('.search-input').val('');
  }

  $('.clear-btn').on('click', clearSearchBar);
  // $('.portfolio-wrap').masonry({
  //   itemSelector: '.portfolio-item',
  //   // columnWidth: 200,
  //   fitWidth: true,
  //   // horizontalOrder: true,
  // });
});
