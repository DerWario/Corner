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
const HEXAGON_SIZE = 150;
const TRIANGLE_SIZE = HEXAGON_SIZE * Math.sqrt(3);
const NUM_COLORS = 6;
const hexMap = [];
const triangleMap = [];
let mouseX = 0;
let mouseY = 0;

function init() {
    canvas.addEventListener("mousemove", event => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    
    
    hexMap.push(new Hexagon(centerX, centerY, rndColor()));
    populateHexMap(hexMap, 5);
    generateTriangleMap();
    
    render();
}

function render() {
    hexMap.forEach(hexagon => hexagon.draw());
    triangleMap.forEach(triangle => triangle.draw());
    
    requestAnimationFrame(render);
}

function getHexagonFromPosition(x, y) {
    let nearestHexagon = null;
    for (const hexagon of hexMap) {
        if (!nearestHexagon || distance(hexagon.x, hexagon.y, x, y) < distance(nearestHexagon.x, nearestHexagon.y, x, y)) {
            nearestHexagon = hexagon;
        }
    }
    if (distance(nearestHexagon.x, nearestHexagon.y, x, y) > HEXAGON_SIZE) {
        return null;
    }
    
    return nearestHexagon;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function generateTriangleMap() {
    let curHex = hexMap[0];
    while (curHex.hexagons[hexPosition.left] != null) {
        curHex = curHex.hexagons[hexPosition.left];
    }
    let startX = curHex.x;
    curHex = hexMap[0];
    while (curHex.hexagons[hexPosition.topLeft] != null) {
        curHex = curHex.hexagons[hexPosition.topLeft];
    }
    let y = curHex.y;
    let w = startX + (centerX - startX) * 2;
    let h = y + (centerY - y) * 2;
    let flipped = false;
    const triangleHeight = TRIANGLE_SIZE * Math.sqrt(3) / 2;
    for (; y < h; y += triangleHeight) {
        for (let x = startX; x < w; x += TRIANGLE_SIZE) {
            triangleMap.push(new Triangle(x, y, false));
            flipped = !flipped;
        }
    }
}

function populateHexMap(hexMap, iterations) {
    if (iterations === 0) {
        return;
    }
    const currentHexMap = [...hexMap];
    currentHexMap.forEach(hexagon => {
        hexagon.getEmptyNeighborSpots().forEach(direction => {
            const position = getHexPosition(hexagon.x, hexagon.y, direction);
            const newHex = new Hexagon(position.x, position.y, rndColor());
            hexMap.push(newHex);
            hexagon.makeNeighbor(newHex, direction);
        });
    });
    populateHexMap(hexMap, iterations - 1);
}

function rotateAround(x, y, angle) {
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.translate(-x, -y);
}

function flipHorizontal(x, y) {
    ctx.translate(x, y);
    ctx.scale(1, -1);
    ctx.translate(-x, -y);
}

function colorToString(color) {
    if (color instanceof CanvasGradient) {
        return color;
    }
    return "rgb(" + color.join(', ') + ")";
}

function rndColor() {
    return colorToString(fromHsv(Math.floor(Math.random() * NUM_COLORS) / NUM_COLORS, 1, 1));
}

function complementaryColor(color) {
    return [255 - color[0], 255 - color[1], 255 - color[2]];
}

function randomColor() {
    return Array(3).fill(null).map(() => Math.floor(Math.random() * 255));
}

function fromHsv(h, s, v) {
    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r * 255, g * 255, b * 255];
}

function getHexPosition(x, y, position) {
    position = (position + 4) % 6;
    const innerRadius = Math.sqrt(3) / 2 * HEXAGON_SIZE;
    const phi = Math.PI * (2 / 6) * position;
    
    return {
      x: x + Math.cos(phi) * 2 * innerRadius,
      y: y + Math.sin(phi) * 2 * innerRadius
    };
}