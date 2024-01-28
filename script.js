$(document).ready(function () {
  const achievementsSection = $('.section--achievements');
  const achievementsList = $('.achievement-value');
  const achievementIconsList = $('.achievement-icon');
  const achievementTextsList = $('.achievement-text');
  setAchievemenetSectionAnimation();
  addEventHandlers();
  setClientsSlider();

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
            duration: 3000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            },
          },
        );
    });
    achievementIconsList.animate({ scale: '1.2' }, 1000);
    achievementTextsList.animate({ scale: '1.2' }, 1000);
  }

  function clearSearchBar() {
    $('.search-input').val('');
  }

  function setAchievemenetSectionAnimation() {
    if (isElementInViewport(achievementsSection)) {
      startCounterAnimation();
    }
  }

  function addEventHandlers() {
    $(window).on('scroll', function () {
      if (isElementInViewport(achievementsSection)) {
        startCounterAnimation();
        $(window).off('scroll');
      }
    });
    $('.clear-btn').on('click', clearSearchBar);
  }

  function setClientsSlider() {
    let currentIndex = 0;
    let intervalId;

    function updateIndicators() {
      $('.indicator').removeClass('indicator--active');
      $('.indicator:eq(' + currentIndex + ')').addClass('indicator--active');
    }

    function startInterval() {
      intervalId = setInterval(function () {
        currentIndex = (currentIndex + 1) % $('.indicator').length;
        updateIndicators();
      }, 3000);
    }

    $('.owl-carousel').owlCarousel({
      items: 4,
      margin: 150,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
    });
    startInterval();
    $('.owl-carousel').on('mouseover', function () {
      clearInterval(intervalId);
    });

    $('.owl-carousel').on('mouseout', function () {
      startInterval();
    });

    updateIndicators();
  }
});
