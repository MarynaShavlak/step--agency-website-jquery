$(document).ready(function () {
  const achievementsSection = $('.section--achievements');
  const achievementsList = $('.achievement-value');
  const achievementIconsList = $('.achievement-icon');
  const achievementTextsList = $('.achievement-text');
  setAchievemenetSectionAnimation();
  addEventHandlers();
  setClientsSlider();
  setModal();
  setPortfolioFilter();
  setMobileMenu();

  function setMobileMenu() {
    $('.mobile-menu-open').on('click', function () {
      $('.mobile-menu-container').animate(
        {
          left: 0,
        },
        300,
      );
    });
    $('.mobile-menu-close').on('click', function () {
      $('.mobile-menu-container').animate(
        {
          left: '100%',
        },
        300,
      );
    });
  }

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
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        768: {
          items: 3,
          margin: 80,
        },
        1920: {
          items: 4,
          margin: 150,
        },
      },
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

  function subscribeWithEmail() {
    const email = $('.modal-text').text();
    console.log(' email : ', email);
    handleModalCloseButtonClick();
    resetSubscriptionData();
  }

  function resetSubscriptionData() {
    $('.modal-text').text('');
    $('.subsc-form__input').text('');
    $('.subsc-form__input').val('');
  }

  function showModalBackdrop() {
    $('.modal-backdrop').fadeIn('slow', function () {
      $('body').addClass('modal-open');
    });
  }

  function hideModalBackdrop() {
    $('.modal-backdrop').fadeOut('slow', function () {
      $('body').removeClass('modal-open');
    });
  }

  function handleSubscriptionFormSubmit(e) {
    e.preventDefault();
    const isValid = isFormValid();
    if (isValid) {
      updateModalInterface();
      showModalBackdrop();
    }
  }

  function updateModalInterface() {
    const inputValue = getInputValue();
    $('.modal-text').text(inputValue);
  }

  function getInputValue() {
    const userEmailInput = $('#user-email');
    const inputValue = userEmailInput.val().trim();
    return inputValue;
  }

  function isFormValid() {
    const userEmailInput = $('#user-email');
    const inputValue = getInputValue();
    const isValid = inputValue !== '';

    updateInputValidationClass(userEmailInput, isValid);

    return isValid;
  }

  function updateInputValidationClass(inputElement, isValid) {
    const errorClass = 'subsc-form__input--error';
    inputElement.toggleClass(errorClass, !isValid);
  }

  function handleModalCloseButtonClick() {
    hideModalBackdrop();
  }

  function setModal() {
    $('.subsc-form').on('submit', handleSubscriptionFormSubmit);
    $('.close-modal-btn').on('click', handleModalCloseButtonClick);
    $('.modal-subscr-btn').on('click', subscribeWithEmail);
  }

  function updateFilterButtons(filters, chosenFilterBtn) {
    filters.removeClass('filters__btn--active');
    $(chosenFilterBtn).addClass('filters__btn--active');
  }

  function showFullPortfolio() {
    $('[data-category]').slideDown();
  }

  function showChosenCategoryWorks(chosenfilterCategory) {
    $('[data-category]').each(function () {
      const itemCategory = $(this).data('category');
      if (chosenfilterCategory !== itemCategory) {
        $(this).slideUp(300);
      } else {
        $(this).slideDown();
      }
    });
  }

  function setPortfolioFilter() {
    let chosenfilterCategory = 'all';
    const filters = $('[data-filter]');
    filters.on('click', function () {
      updateFilterButtons(filters, this);

      chosenfilterCategory = $(this).data('filter');
      if (chosenfilterCategory === 'all') {
        showFullPortfolio();
      } else {
        showChosenCategoryWorks(chosenfilterCategory);
      }
    });
  }
});
