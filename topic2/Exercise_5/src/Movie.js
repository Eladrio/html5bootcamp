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
