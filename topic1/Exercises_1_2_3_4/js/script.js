/** Event listener for the "load" Event.
 * This event occurs when the whole page, dependencies included, finishes loading.
 */
window.addEventListener("load", initPage);

/**
 * initPage() configures all the events once the whole page has loaded,incluing
 * all dependant resources.
 * This way we make sure that all DOM's elements are loaded before manipulate them
 *
 * @param {Event} event
 */
function initPage(event) {
  let hiddenSection = document.querySelector(".hidden");

  let btnShowAlert = document.querySelector(".btn-show-alert");
  btnShowAlert.addEventListener('click', showAlert);

  function showAlert() {
    window.alert("This is an alert message!")
  }

  function fadeIn() {
    hiddenSection.className = "visible";
  }

  fadeIn();
}
