document.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  class Movie {
    constructor(name, year, duration) {
      this.title = name;
      this.year = year;
      this.duration = duration;
    }

    play() {
      console.log("Playing " + this.title + " Movie...");
    }

    pause() {
      console.log(this.title + " Movie is paused");
    }

    resume() {
      console.log("Resumed " + this.title + " Movie playing");
    }

  }

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

  let movBatman = new Movie("Batman 2", 1992, 93);
  let movStar = new Movie("Star Wars I", 1994, 103);
  let movGod = new Movie("Godfather 1", 1979, 120);

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