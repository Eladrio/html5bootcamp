document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  class EventEmitter {
    constructor() {
      this.events = {};
    }

    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    }

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

    play() {
      console.log("Playing " + this.title + " movie");
      this.emit("play");
    }

    pause() {
      console.log(this.title + " Movie is paused");
      this.emit("pause");
    }

    resume() {
      console.log("Resumed " + this.title + " Movie playing");
      this.emit("resumed");
    }

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
  Object.assign(movBatman, social);
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