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

function init() {
    var canvas = document.getElementById('canvas');

    var hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776, // 30 degrees in radians
        sideLength = 100,
        boardWidth = 100,
        boardHeight = 100;

    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 1;

        drawBoard(ctx, boardWidth, boardHeight);

        canvas.addEventListener("mousemove", function (eventInfo) {
            var x,
                y,
                hexX,
                hexY,
                screenX,
                screenY,
                rect;

            rect = canvas.getBoundingClientRect();

            x = eventInfo.clientX - rect.left;
            y = eventInfo.clientY - rect.top;

            hexY = Math.floor(y / (hexHeight + sideLength));
            hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

            screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
            screenY = hexY * (hexHeight + sideLength);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawBoard(ctx, boardWidth, boardHeight);

            // Check if the mouse's coords are on the board
            if (hexX >= 0 && hexX < boardWidth) {
                if (hexY >= 0 && hexY < boardHeight) {
                    ctx.fillStyle = "#000000";
                    drawHexagon(ctx, screenX, screenY, true);
                }
            }
        });
    }

    function drawBoard(canvasContext, width, height) {
        var i,
            j;

        for (i = 0; i < width; ++i) {
            for (j = 0; j < height; ++j) {
                drawHexagon(
                    ctx,
                    i * hexRectangleWidth + ((j % 2) * hexRadius),
                    j * (sideLength + hexHeight),
                    false
                );
            }
        }
    }

    function drawHexagon(canvasContext, x, y, fill) {
        var fill = fill || false;

        canvasContext.beginPath();
        canvasContext.arc(x + hexRadius, y, 5, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        canvasContext.moveTo(x + hexRadius, y);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
        canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
        canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
        canvasContext.lineTo(x, y + sideLength + hexHeight);
        canvasContext.lineTo(x, y + hexHeight);
        canvasContext.closePath();


        if (fill) {
            canvasContext.fill();
        } else {
            canvasContext.stroke();
        }
    }
}
