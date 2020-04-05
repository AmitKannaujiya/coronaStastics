// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function () {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var translate = navigator.mozL10n.get;

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once(start);

  // ---

  function start() {

    var message = document.getElementById('message');

    // We're using textContent because inserting content from external sources into your page using innerHTML can be dangerous.
    // https://developer.mozilla.org/Web/API/Element.innerHTML#Security_considerations
    //message.textContent = translate('message');

  }

  function showDetail(className) {
    $('.' + className).toggleClass('hide');
  }

});

  /* Handle keydown events */
  window.addEventListener("keydown", keyNavigation);

  function keyNavigation(e) {
      if (e.key == "ArrowDown") {
          $(".card:focus").next().focus();
      }
      if (e.key == "ArrowUp") {
          $(".card:focus").prev().focus();
      }
      if (!$(':focus').length) {
          // console.log("No focus set, now focusing back")
          $(".card")[0].focus();
      }
      if ((e.key == "Enter") && $(':focus').length) {
          //videoNameclick($(':card')[0]);
      }
      if (e.key == "SoftRight") {
          alert("Nothing assigned to " + e.key);
      }
      if (e.key == "SoftLeft") {
          alert("Nothing assigned to " + e.key);
      }
      if (e.key == "Backspace") {
          // Handle if you want to go to previous menu or to exit directly;
          e.preventDefault(); // to prevent app from exiting
          let exit = confirm("Are your sure want to exit");
          if (exit) {
              window.close();
          }
      }
  }
