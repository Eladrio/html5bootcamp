/** Event listener for the "load" Event.
 * This event occurs when the whole page, dependencies included, finishes loading.
 * Doing it this way with all the functionality inside a function scope I make sure
 * that the user can't access the variables from the console just by writing their names
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

  let btnAction = document.querySelector("#btn-action");
  btnAction.addEventListener('click', getResponseFromApi);

  let searchUl = document.querySelector(".search-result-list");
  let pErrorParameters = document.querySelector("#p-error-search");

  let searchInput = document.getElementById("search-query");
  searchInput.addEventListener('change',() => {
    doSearch(searchInput.value);
  })

/**
 * createTable() receives a bidimensional array and creates a table object in the DOM
 * using the array data as input.
 *
 * @param {Array} matrix
 */
  function createTable(matrix) {
    let tableSection = document.querySelector(".table-section");
    let table = document.createElement("table");
    tableSection.appendChild(table);
    matrix.forEach((item) => {
      let tr = document.createElement("tr");
      table.appendChild(tr);
      item.forEach(element => {
        let td = document.createElement("td");
        let tdText = document.createTextNode(element);
        td.appendChild(tdText);
        tr.appendChild(td);
      });
    });
  }

  /**
   * doSearch() makes the search for the query received as parameter
   * @param {String} query
   */
  function doSearch(query) {
    //clears the ul from the previous results.
    while(searchUl.firstChild) searchUl.removeChild(searchUl.firstChild);
    getResponseFromApiWithParameters(query);
  }

  /**
   * showRepositoriesList() displays a list of repositories in the webpage
   * @param {Array} items
   */
  function showRespositoriesList(items) {
    items.forEach((item) => {
      let liItem = document.createElement("li");
      let pLi = document.createElement("p");
      pLi.innerHTML = item.url;
      liItem.appendChild(pLi);
      searchUl.appendChild(liItem);
    })
  }


  /**
   * getResponseFromApiWithParameters()
   *
   * @param {String} query
   */
  function getResponseFromApiWithParameters(query) {
    let baseUrl = 'https://api.github.com/search/repositories';
    let queryParameter = 'q=' + encodeURIComponent(query);
    let completeUrl = baseUrl + '?' + queryParameter;

    let config = {
      url: completeUrl,
      method: 'GET',
      responseType: 'json'
    }

    reusableAjaxCall(config).then(function (response) {
      showRespositoriesList(response.items);
    }, function (error) {
      pErrorParameters.innerHTML = error;
    })

  }

  /**
   * reusableAjaxCall() returns a new Promise based on the AJAX call
   * configured by the passed config Object.
   *
   * @param {Object} config
   * @return {Promise} new Promise
   */
  function reusableAjaxCall(config) {
    return new Promise(function (resolve, reject) {
      const http = new XMLHttpRequest();
      http.open(config.method, config.url);
      http.responseType = config.responseType;

      http.onload = function () {
        if (http.status == 200) {
          resolve(http.response);
        } else {
          reject(Error(http.statusText));
        }
      };
      http.onerror = function () {
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
    const url = 'http://api.icndb.com/jokes/random';

    http.open("GET", url);
    http.responseType = "json";
    http.send();

    //status == 200 => request completed
    http.onload = function () {
      if (this.status == 200) {
        let responseObject = http.response;
        hiddenSection.firstElementChild.innerHTML = responseObject.value.joke;
      }
      else {
          hiddenSection.classList.add("error");
      }
    }
    http.onerror = function() {
      hiddenSection.innerHTML = "Error";
      hiddenSection.classList.add("error");
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
  reusableAjaxCall(config).then(function (response) {
    hiddenSection.firstElementChild.innerHTML = response.value.joke;
  }, function (error) {
    hiddenSection.firstElementChild.innerHTML = "There was an Error with the request to server";
    hiddenSection.classList.add("error");
  })

  getResponseFromApiWithParameters('JavaScript');

  let matrix = [
    ["Electricity", "$1100", "14/05/2019"],
    ["Internet", "$500", "27/05/2019"],
    ["CellPhone", "$1000", "3/06/2019"]
  ];
  createTable(matrix);
}