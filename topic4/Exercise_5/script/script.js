
/**
 * getRandomColor() returns a random color
 * @return {String}
 */
function getRandomColor() {
  return "rgb(" + [
    Math.round(Math.random() * 0xFF),
    Math.round(Math.random() * 0xFF),
    Math.round(Math.random() * 0xFF)
  ].join() + ")";
}

/**
 * drawRectangle() receives the context and draws a randomColor Rectangle
 * @param {Object} context
 */
function drawRectangle(context) {
  context.beginPath();
  context.rect(25, 50, 200, 100);
  context.fillStyle = getRandomColor();
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = getRandomColor();
  context.stroke();
}

/**
 * drawCircle() receives the context and draws a randomColor Circle
 * @param {Object} context
 */
function drawCircle(context) {
  context.beginPath();
  context.arc(200, 200, 69, 0, 2 * Math.PI, false);
  context.fillStyle = getRandomColor();
  context.fill();
  context.lineWidth = 5;
  context.style = getRandomColor();
  context.stroke();
}

/**
 * drawSquare() receives the context and draws a randomColor Square
 * @param {Object} context
 */
function drawSquare(context) {
  context.beginPath();
  context.rect(200, 200, 50, 50);
  context.fillStyle = getRandomColor();
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = getRandomColor();
  context.stroke();
}

/**
 * drawRandoms() get the canvas from the DOM and set the context, then draws
 * a random figure
 */
function drawRandoms() {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext("2d");
  let randomFigure = Math.floor((Math.random() * 3) + 1);
  switch (randomFigure) {
    case 1:
      drawRectangle(context);
      break;
    case 2:
      drawCircle(context);
      break;
    case 3:
      drawSquare(context);
      break;
    default:
      break;
  }
}

let rectX = 0;
let rectY = 0;
let canvas = document.getElementById("canvas-animated");
let context = canvas.getContext("2d");

/**
 * animationLoop() manages the rectangle's animation
 * @param {*} timestamp
 */
function animationLoop(timestamp) {
  update();
  draw();
  window.requestAnimationFrame(animationLoop);
}

/**
 * update() updates the rectangle's position in the canvas
 */
function update() {
  if (rectX > canvas.width || rectY > canvas.height) {
    rectX = 0;
    rectY = 0;
  } else {
    rectX += 1;
    rectY += 1;
  }
}

/**
 * draw() clears the rectangle from the previous position and draws the new one
 */
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#ff8080';
  context.fillRect(rectX, rectY, 150, 100);
}

animationLoop();
drawRandoms();
