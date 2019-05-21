export default Logger;

class Logger {
  constructor() {
  }

  log(info) {
    console.log("The event " + info + " has been emitted");
  }
}