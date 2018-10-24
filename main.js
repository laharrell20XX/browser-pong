// if (bx + 5 > canvas.width) {
//     while (bx > 10) { // wraps the ball around the screen
//         canvasCtx.clearRect(0, 0, 1192, 600);
//         bx -= 5;
//         canvasCtx.fillRect(bx, by, 10, 10);
//     }
// }
var bx = 596; // ball's pos on the x axis
var by = 300; // ball's pos on the y axis
const px = 1182;
var py = 300 - 600 * 0.1;
var paddleHeight = 600 * 0.25;
var moveRight = true; // state of movement on the ball, if true, ball is moving right; if false ball is moving left
var tickRate = 1000;

window.onload = function() {
    var canvas = this.document.querySelector("canvas.world");
    var canvasCtx = canvas.getContext("2d");
    canvasCtx.fillRect(by, bx, 10, 10);
    canvasCtx.fillRect(
        1182,
        300 - canvas.height * 0.1,
        10,
        canvas.height * 0.25
    );
    window.addEventListener("keypress", function(ev) {
        movePaddle(ev);
    });
    this.setInterval(pong, tickRate / 60); // 30 times per second
};

function pong() {
    canvas = this.document.querySelector("canvas.world");
    var canvasCtx = canvas.getContext("2d");
    canvasCtx.clearRect(bx, by, 10, 10);
    if (moveRight && bx < canvas.width - 10) {
        bx += 5;
        canvasCtx.fillRect(bx, by, 10, 10);
    } else {
        moveRight = false; // keeps the ball from moving right
        bx -= 5;
        if (bx - 5 < 0) {
            // ball's x is less than the canvas size
            moveRight = true; // ball moves right again
        }
        canvasCtx.fillRect(bx, by, 10, 10);
    }
}

function movePaddle(ev) {
    canvas = this.document.querySelector("canvas.world");
    var canvasCtx = canvas.getContext("2d");
    switch (ev.key) {
        case "ArrowDown":
            if (py >= canvas.height - paddleHeight) {
                break;
            } else {
                canvasCtx.clearRect(px, py, 10, paddleHeight);
                py += 10;
                canvasCtx.fillRect(px, py, 10, paddleHeight);
                break;
            }
        case "ArrowUp":
            if (py <= 0) {
                break;
            } else {
                canvasCtx.clearRect(px, py, 10, paddleHeight);
                py -= 10;
                canvasCtx.fillRect(px, py, 10, paddleHeight);
                break;
            }
    }
}
