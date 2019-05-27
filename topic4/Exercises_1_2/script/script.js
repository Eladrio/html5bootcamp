let btnSaveLocal = document.querySelector('#btn-input-local');
let btnSaveIndexed = document.querySelector('#btn-input-indexed-db');
let btnClear = document.querySelector('#btn-clear');
let pDisplay = document.querySelector('#show-data');
let count = 0;
btnSaveLocal.addEventListener('click', saveInputLocal);
btnClear.addEventListener('click', clearData);
btnSaveIndexed.addEventListener('click', saveInputIndexed);

let textArea = document.querySelector('#textarea-input');
textArea.addEventListener('dragover', () => {
  this.classlist.add('dragover');
})

let db;
let dbName = 'InputsDatabase';

function getInputData() {
  let inputObject = {};
  let textAreaInValue = document.getElementById('textarea-input').value;
  inputObject.txt = textAreaInValue;
  return inputObject;
}

function saveInputLocal() {
  if (typeof(Storage)) {
    let input = getInputData();
    localStorage.setItem('textAreaInput-' + count.toString(), input);
    document.getElementById('textarea-input').value = "";
    count++;
  }

}

function saveInputIndexed() {
  if (window.indexedDB) {
    let input = getInputData();
    let request = window.indexedDB.open(dbName, 1);

    request.onerror = function(event) {
      pDisplay.innerHTML = 'Database error: ' + event.target.errorCode;
    }

    request.onupgradeneeded = function(event) {
      let db = event.target.result;
      let textAreaInputStore = db.createObjectStore('textAreaInput', {autoIncrement: true});
      textAreaInputStore.transaction.oncomplete = function(event) {
        console.log("The object store has been created " + textAreaInputStore);
      }
    }

    request.onsuccess = function(event) {
      db = event.target.result;
      let transaction = db.transaction(["textAreaInput"], 'readwrite');
      let objectStore = transaction.objectStore('textAreaInput');
      let request = objectStore.add(input);

      request.onsuccess = function(event) {
        console.log("data added to objectStore");
      };
      db.close();
      document.getElementById('textarea-input').value = "";
    };
  }
  else {
    pDisplay.innerHTML = "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  }
}

function clearData() {
  localStorage.clear();
  count = 0;

  let request = window.indexedDB.deleteDatabase(dbName);

  request.onerror = function(event) {
    console.log("There was an error when deleting the database");
  }
}