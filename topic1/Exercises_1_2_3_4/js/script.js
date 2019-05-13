/** Event listener for the "load" Event. This event occurs when the whole page, dependencies included, finishes loading.
 * For better efficiency in larger webpages or web applicactions we could use the async attribute in the script tag in html.
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

  function fadeIn() {
    hiddenSection.className = "visible";
  }

  fadeIn();
}
