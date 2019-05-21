export default EventEmitter;

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