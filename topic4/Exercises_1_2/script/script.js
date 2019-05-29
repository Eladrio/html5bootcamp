let btnSaveLocal = document.querySelector('#btn-input-local');
let btnSaveIndexed = document.querySelector('#btn-input-indexed-db');
let btnClear = document.querySelector('#btn-clear');
let pDisplay = document.querySelector('#show-data');
let count = 0;
btnSaveLocal.addEventListener('click', saveLocal);
btnClear.addEventListener('click', clearData);
btnSaveIndexed.addEventListener('click', saveInputIndexed);

let textArea = document.querySelector('#textarea-input');

// Adds a css class to the textArea element when is dragged over.
textArea.addEventListener('dragover', function () {
  this.classList.add('dragover');
  return false;
});

//Adds a css class to the textArea element when its no more dragged over.
textArea.addEventListener('dragleave', function () {
  this.classList.remove('dragover');
  return false;
});

//Loads the file in the textArea element when is dropped.
textArea.addEventListener('drop', function (event) {
  event.preventDefault();
  textArea.value = "";
  let files = event.dataTransfer.files;
  let reader = new FileReader()
  reader.readAsText(files[0]);
  reader.onloadend = function() {
  textArea.value = reader.result;
  }
});

let db;
let dbName = 'InputsDatabase';

/**
 * getInputData() gets the input from the textArea element and returns its value.
 *
 * @return {String} inputObject
 */
function getInputData() {
  let inputObject = {};
  let textAreaInValue = document.getElementById('textarea-input').value;
  inputObject.txt = textAreaInValue;
  return inputObject;
}

/**
 * saveInputLocal() saves the input received as parameter to the LocalStorage.
 *
 * @param {String} input
 */
function saveInputLocal(input) {
  if (typeof (Storage)) {
    localStorage.setItem('textAreaInput-' + count.toString(), input);
    document.getElementById('textarea-input').value = "";
    count++;
  }
}


/**
 * saveLocal() gets the input with getInputData() and calls saveInputLocal() to save the input
 * in the LocalStorage.
 */
function saveLocal() {
  let input = getInputData();
  saveInputLocal(input);
}

/**
 * saveInputIndexed() saves the input from textArea into a IndexedDB storage.
 */
function saveInputIndexed() {
  if (window.indexedDB) {
    let input = getInputData();
    let request = window.indexedDB.open(dbName, 1);

    request.onerror = function (event) {
      pDisplay.innerHTML = 'Database error: ' + event.target.errorCode;
    }

    request.onupgradeneeded = function (event) {
      let db = event.target.result;
      let textAreaInputStore = db.createObjectStore('textAreaInput', {
        autoIncrement: true
      });
      textAreaInputStore.transaction.oncomplete = function (event) {
        console.log("The object store has been created " + textAreaInputStore);
      }
    }

    request.onsuccess = function (event) {
      db = event.target.result;
      let transaction = db.transaction(["textAreaInput"], 'readwrite');
      let objectStore = transaction.objectStore('textAreaInput');
      let request = objectStore.add(input);

      request.onsuccess = function (event) {
        console.log("data added to objectStore");
      };
      db.close();
      document.getElementById('textarea-input').value = "";
    };
  } else {
    pDisplay.innerHTML = "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  }
}

/**
 * clearData() clears both storages(LocalStorage and IndexedDB).
 */
function clearData() {
  localStorage.clear();
  count = 0;
  let request = window.indexedDB.deleteDatabase(dbName);
  request.onerror = function (event) {
    console.log("There was an error when deleting the database");
  }
}