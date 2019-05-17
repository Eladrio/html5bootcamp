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
          callback.call(null, eventName);
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
  }

  class Actor {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  }

  let movBatman = new Movie("Batman 2", 1992, 93);
  let movStar = new Movie("Star Wars I", 1994, 103);
  let movGod = new Movie("Godfather 1", 1979, 120);

  function playListener() {
    console.log("The playListener listened that Batman's movie is playing");
  }

  function pauseListener() {
    console.log("The pauseListener listened that Batman's movie is paused");
  }

  function resumedListener() {
    console.log("The resumedListener listened that Batman's movie is resumed");
  }

  let listenerBatPlay = movBatman.on("play", playListener);
  let listenerBatPause = movBatman.on("pause", pauseListener);
  let listenerBatResume = movBatman.on("resumed", resumedListener);

  movBatman.play();
  movBatman.pause();
  movBatman.resume();

  movStar.play();
  movStar.pause();
  movStar.resume();

  movGod.play();
  movGod.pause();
  movGod.resume();
}