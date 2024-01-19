$(document).ready(function () {
  const achievementsSection = $('.section--achievements');
  const achievementsList = $('.achievement-value');
  const achievementIconsList = $('.achievement-icon');
  const achievementTextsList = $('.achievement-text');
  setAchievemenetSectionAnimation();
  addEventHandlers();
  // setClientsSlider();

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

  // function setClientsSlider() {
  //   const totalSlides = $('.slide').length;
  //   let currentSlide = 1;

  //   function showSlide(index) {
  //     console.log('index: ', index);
  //     $('.slide').css('order', function (i) {
  //       return ((index + i - 1) % totalSlides) + 1;
  //     });
  //     $('.indicator').removeClass('indicator--active');
  //     $('.indicator')
  //       .eq(index - 1)
  //       .addClass('indicator--active');
  //     currentSlide = index;
  //   }

  //   function nextSlide() {
  //     currentSlide = (currentSlide % totalSlides) + 1;
  //     showSlide(currentSlide);
  //   }

  //   function prevSlide() {
  //     currentSlide = ((currentSlide - 2 + totalSlides) % totalSlides) + 1;
  //     showSlide(currentSlide);
  //   }

  //   $('.indicator').on('click', function () {
  //     showSlide($(this).index() + 1);
  //   });

  //   // setInterval(nextSlide, 1000);
  // }

  $('.owl-carousel').owlCarousel({
    // items: 4,
    margin: 150,
    dots: true,
    dotsContainer: '.indicators',
    dotsEach: true,
    // loop: true,
    // autoplay: true,
    // autoplayTimeout: 3000,
    // autoplayHoverPause: true,
  });
});
