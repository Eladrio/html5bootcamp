document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
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
        eventArr.forEach((callback) => {
          if (typeof callback === 'function') {
            callback();
          }
          else if (typeof callback === 'object') {
            callback.log(eventName);
          }
        })
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
        this.events[eventName] = this.events[eventName].filter((eventCallback) => {
          callback !== eventCallback;
        });
      }
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
      this.cast.forEach((item) => console.log(item));
    }
  }

  class Actor {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }

  class Logger {
    constructor() {
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

  const social = {
    share : function(friendName) {
      console.log(`${friendName} shares ${this.title}`);
    },
    like : function(friendName) {
      console.log(`${friendName} likes ${this.title}`);
    }
  }

  let movBatman = new Movie("Batman 2", 1992, 93);

  // The assign is used to copy all the enumerable properties from social into movBatman
  Object.assign(movBatman, social);

  // The bind is used to bind the reference of "this" to movBatman when using share and like
  movBatman.share.bind(movBatman);
  movBatman.like.bind(movBatman);

  let movStar = new Movie("Star Wars I", 1994, 103);
  let movGod = new Movie("Godfather 1", 1979, 120);

  const terminator = new Movie('Terminator I', 1985, 60);
  const arnold = new Actor('Arnold Schwarzenegger', 50);
  const actors = [
    new Actor('Paul Winfield', 50),
    new Actor('Michael Biehn', 50),
    new Actor('Linda Hamilton', 50)
  ];
  terminator.addCast(arnold);
  terminator.addCast(actors);

  function playListener() {
    console.log("The playListener listened that Batman's movie is playing");
  }

  function pauseListener() {
    console.log("The pauseListener listened that Batman's movie is paused");
  }

  function resumedListener() {
    console.log("The resumedListener listened that Batman's movie is resumed");
  }

  movBatman.on("play", playListener);

  let batPlayListener =  new Logger();

  movBatman.on("play",batPlayListener);

  let batPauseListener =  new Logger();

  movBatman.on("pause",batPauseListener);

  let batResumedListener =  new Logger();

  movBatman.on("resumed",batResumedListener);


  movBatman.play();
  movBatman.pause();
  movBatman.resume();

  movStar.play();
  movStar.pause();
  movStar.resume();

  movGod.play();
  movGod.pause();
  movGod.resume();

  movBatman.share("Mike");
  movBatman.like("John");
}