export default Movie;

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