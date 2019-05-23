  class Logger {
    constructor(eventName, objectToListen) {
      this.listener = objectToListen.addEventListener(eventName, function() {
        this.log(info);
      })
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