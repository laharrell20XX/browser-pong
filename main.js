// if (bx + 5 > canvas.width) {
//     while (bx > 10) { // wraps the ball around the screen
//         canvasCtx.clearRect(0, 0, 1192, 600);
//         bx -= 5;
//         canvasCtx.fillRect(bx, by, 10, 10);
//     }
// }

const W = 1192;
const H = 600;
var bx = 596; // ball's pos on the x axis
var by = 300; // ball's pos on the y axis
const px = 1182;
var py = 300 - H * 0.1;
var paddleHeight = H * 0.25;
var moveRight = true; // state of movement on the ball, if true, ball is moving right; if false ball is moving left
var tickRate = 1000;
var angleOfY = 0;
var moveUp = true;
var hitTop = false;
var hitBottom = false;

window.onload = function () {
    var canvas = this.document.querySelector("canvas.world");
    var canvasCtx = canvas.getContext("2d");
    canvasCtx.fillRect(px, py, 10, paddleHeight);
    window.addEventListener("keydown", function (ev) {
        movePaddle(ev);
    });
    this.setInterval(pong, tickRate / 60); // 30 times per second
};

function pong() {
    canvas = this.document.querySelector("canvas.world");
    var canvasCtx = canvas.getContext("2d");
    canvasCtx.clearRect(bx, by, 10, 10);

    function reset() {
        canvasCtx.clearRect(0, 0, W, H);
        bx = W / 2;
        by = H / 2;
        py = 300 - 600 * 0.1;
        paddleHeight = 600 * 0.25;
        moveRight = true;
        tickRate = 1000;
        canvasCtx.fillRect(px, py, 10, paddleHeight);
        angleOfY = 0;
        hitTop = false;
        hitBottom = false;

    }

    function ballMovX() {
        if (moveRight) {
            bx += 5;
            if (
                py <= by &&
                by <= py + paddleHeight &&
                bx >= canvas.width - 25
            ) {
                // checks if the ball will touch the paddle {
                // if the ball hits the paddle start moving the ball left
                console.log("good hit");
                moveRight = false;
                angleOfY = -Math.ceil((by - py - 70) / 15);
                if (Math.abs(angleOfY) == 0) {
                    /* if ball hits center of paddle launch ball in 
                    random direction */
                    angleOfY = [-1, 1][Math.floor(Math.random() * 2)];
                }
            }
            if (bx >= canvas.width) {
                reset();
            }
        } else {
            moveRight = false; // keeps the ball from moving right
            bx -= 5;
            if (bx - 5 < 0) {
                // ball's x is less than the canvas size
                moveRight = true; // ball moves right again
            }
        }
    }

    function ballMovY() {
        if (0 >= by - 10) {
            // hits the top of the window
            hitTop = true;
            hitBottom = false;
        }
        if (by + 10 >= H - Math.abs(angleOfY)) {
            // hits the bottom of the window
            hitBottom = true;
            hitTop = false;
        }
        if (!hitTop && !hitBottom) {
            // if both false move in direction of angleOfY
            by -= angleOfY
        }
        if (hitTop) {
            // if reached top bounds
            if (angleOfY > 0) {
                // if hit tb from upper paddle move in direction of aOY
                by += angleOfY;
            } else {
                /* if hit tb from lower paddle move opposite of aOY 
                (aoY < 0)*/
                by -= angleOfY;
            }
        }
        if (hitBottom) {
            // if reached bottom bounds
            if (angleOfY > 0) {
                /* if hit tb from upper paddle move opposite of aOY 
                (aOY > 0)*/
                by -= angleOfY;
            } else {
                // if hit tb from lower paddle move in direction of aOY
                by += angleOfY;
            }
        }

    }
    ballMovX();
    ballMovY();
    canvasCtx.fillRect(bx, by, 10, 10);
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