const MIN_GRADIENT_VALUE = 1e-10;
const canvas = document.getElementById("canvas");
let width = window.innerWidth;
let height = window.innerHeight;
let biggerDimension = Math.max(width, height);
canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext("2d");
let centerX = width / 2;
let centerY = height / 2;
let tickNum = 0;
const maxSteps = 15;
let spiralColors;
const my_length = 150;

function init() {


    const hex = new Hexagon(centerX, centerY, 'blue', my_length)
    hex.draw();
    let hexPost = getHexPosition(centerX, centerY, 1, my_length);
    const newhex = new Hexagon(hexPost.x, hexPost.y, 'green', my_length)
    hex.makeNeighbor(newhex, 1);
    newhex.draw()
}

function rotateAround(x, y, angle) {
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.translate(-x, -y);
}

function colorToString(color) {
    if (color instanceof CanvasGradient) {
        return color;
    }
    return "rgb(" + color.join(', ') + ")";
}

function complementaryColor(color) {
    return [255 - color[0], 255 - color[1], 255 - color[2]];
}

function randomColor() {
    return Array(3).fill(null).map(() => Math.floor(Math.random() * 255));
}

function getHexPosition(x, y, position, length) {
    position = (position + 4) % 6;
    const innerRadius = Math.sqrt(3) / 2 * length;
    const phi = Math.PI * (2 / 6) * position;
    return {
      x: x + Math.cos(phi) * 2 * innerRadius,
      y: y + Math.sin(phi) * 2 * innerRadius
    };
    // return {
    //   x: x + 2 * innerRadius,
    //   y: y
    // };
}