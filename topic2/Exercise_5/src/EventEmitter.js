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