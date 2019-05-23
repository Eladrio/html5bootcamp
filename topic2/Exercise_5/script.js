class Actor {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

}
class EventEmitter {
  constructor() {
    this.events = {};
  }
  /**
   * The on() method receives an eventName and a callback and stores inside the events
   * object an array with all the callbacks listening to the event with "eventName" name.
   *
   * @param {String} eventName
   * @param {Object} callback
   */


  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }
  /**
   * The emit() method receives an event name and notifyes all callbacks related to that
   * eventName.
   *
   * @param {String} eventName
   */


  emit(eventName) {
    const eventArr = this.events[eventName];

    if (eventArr) {
      eventArr.forEach(callback => {
        if (typeof callback === 'function') {
          callback();
        } else if (typeof callback === 'object') {
          callback.log(eventName);
        }
      });
    }
  }
  /**
   * The off() method receives an event name and a callback and deletes that callback
   * from the corresponding eventName's array.
   *
   * @param {String} eventName
   * @param {Object} callback
   */


  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(eventCallback => {
        callback !== eventCallback;
      });
    }
  }

}
class Logger {
  constructor(eventName, objectToListen) {
    this.listener = objectToListen.addEventListener(eventName, function () {
      this.log(info);
    });
  }
  /**
   * The log() method is the method that gets called in the emit() method of the EventEmitter
   * class. And receives the info that the EventEmitter emitted.
   * @param {*} info
   */


  log(info) {
    console.log("The event " + info + " has been emitted");
  }

}
class Movie extends EventEmitter {
  constructor(name, year, duration) {
    super();
    this.title = name;
    this.year = year;
    this.duration = duration;
    this.cast = [];
  }
  /**
   * The play() method emits a play event using the inherited emit() method
   * from the EventEmitter class.
   */


  play() {
    console.log("Playing " + this.title + " movie");
    this.emit("play");
  }
  /**
   * The pause() method emits a pause event using the inherited emit() method
   * from the EventEmitter class.
   */


  pause() {
    console.log(this.title + " Movie is paused");
    this.emit("pause");
  }
  /**
  * The resume() method emits a resumed event using the inherited emit() method
  * from the EventEmitter class.
  */


  resume() {
    console.log("Resumed " + this.title + " Movie playing");
    this.emit("resumed");
  }
  /**
   *The addCast() method adds the cast received to the cast arrays of the Movie.
   *
   * @param {Object} cast
   */


  addCast(cast) {
    this.cast = this.cast.concat(cast);
  }

  showCast() {
    this.cast.forEach(item => console.log(item));
  }

}
