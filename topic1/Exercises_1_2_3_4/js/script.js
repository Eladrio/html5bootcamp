/** Event listener for the "load" Event.
 * This event occurs when the whole page, dependencies included, finishes loading.
 */
window.addEventListener("load", initPage);

/**
 * initPage() configures all the events once the whole page has loaded,incluing
 * all dependant resources.
 * This way we make sure that all DOM's elements are loaded before beginning to manipulate them
 *
 * @param {Event} event
 */
function initPage(event) {
  let hiddenSection = document.querySelector(".hidden");

  let btnShowAlert = document.querySelector(".btn-show-alert");
  btnShowAlert.addEventListener('click', getResponseFromApi);

  /**
   * ajaxCall() returns a new Promise based on the AJAX call
   * configured by the passed config Object.
   *
   * @param {Object} config
   * @return {Promise} promise
   */
  function ajaxCall(config) {
    return new Promise(function(resolve, reject) {
      const http = new XMLHttpRequest();
      http.open(config.method,config.url);
      http.responseType = config.responseType;

      http.onload = function() {
        if (http.status == 200) {
          resolve(http.response);
        }
        else {
          reject(Error(http.statusText));
        }
      };
      http.onerror = function() {
        reject(Error("Network Error"));
      };
      http.send();
    });
  }

  /**
   * getResponseFromApi() makes the AJAX call and displays in the DOM
   * the response received from the API.
   */
  function getResponseFromApi() {
    const http = new XMLHttpRequest();
    const url = 'http://api.iccndb.com/joke/random';

    http.open("GET", url);
    http.responseType = "json";
    http.send();

    // readyState == 4 => request succesful, status == 200 => request completed
    http.onload = function() {
      if (this.status == 200){
        let responseObject = http.response;
        hiddenSection.firstElementChild.innerHTML = responseObject.value.joke;
      }
    }

  }

  /**
   * showAlert() displays an alert in the webpage.
   */
  function showAlert() {
    window.alert("This is an alert message!")
  }

  /**
   * fadeIn() applies 'visible' class to hiddenSection
   * to execute the fade-in.
   */
  function fadeIn() {
    hiddenSection.className = "visible";
  }

  fadeIn();


  // config Object to test the ajaxCall function
  let config = {
    url: 'http://api.icndb.com/jokes/random',
    method: 'GET',
    responseType: 'json'
  };

  /**
   * If there was an error with the request then an error
   * message is displayed and the background color of the section turns red.
   * Else displays the response.
   *
   */
  ajaxCall(config).then(function(response) {
    hiddenSection.firstElementChild.innerHTML = response.value.joke;
  }, function(error) {
    hiddenSection.firstElementChild.innerHTML = "There was an Error with the request to server";
    hiddenSection.classList.add("error");
  })

}
