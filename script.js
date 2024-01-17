$(document).ready(function () {
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
