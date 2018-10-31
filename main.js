// if (bx + 5 > canvas.width) {
//     while (bx > 10) { // wraps the ball around the screen
//         canvasCtx.clearRect(0, 0, 1192, 600);
//         bx -= 5;
//         canvasCtx.fillRect(bx, by, 10, 10);
//     }
// }
const W = 1192;
const H = 600;
var tickRate = 1000;
// gets the canvas and its context
var canvas = this.document.querySelector("canvas.world");
var canvasCtx = canvas.getContext("2d");

// assigns module aliases
var Engine = Matter.Engine
var Bodies = Matter.Bodies
var World = Matter.World
var Composite = Matter.Composite


//creates an engine and sets defaults of the world
var engine = Engine.create()
engine.world.gravity.y = 0



// creates the pong objects and adds them to the world
var pongBall = Bodies.rectangle(W / 2, H / 2, 10, 10) // only keeps track of initial ball creation
World.add(engine.world, [pongBall])


var bx = pongBall.position.x; // ball's pos on the x axis
var by = pongBall.position.y; // ball's pos on the y axis
// const px = 1182;
// var py = 300 - H * 0.1;
// var paddleHeight = H * 0.25;
// var moveRight = true; // state of movement on the ball, if true, ball is moving right; if false ball is moving left
// var angleOfY = 0;
// var moveUp = true;

window.onload = function () {
    // window.addEventListener("keypress", function (ev) {
    //     movePaddle(ev);
    // });

    this.setInterval(newPong, tickRate / 60); // 30 times per second
};

// start of newPong function
function newPong() {
    var bodies = Composite.allBodies(engine.world);
    Engine.update(engine, 1000 / 60)

    canvasCtx.fillStyle = "black"
    canvasCtx.fillRect(0, 0, W, H)
    canvasCtx.beginPath(); // to get more accurate clearing and redrawing, may have to draw based on vertices

    for (var i = 0; i < bodies.length; i += 1) { // iterates over each body in the world
        var vertices = bodies[i].vertices; // sets the vertices of the body as a variable

        canvasCtx.moveTo(vertices[0].x, vertices[0].y); // moves the drawing to its starting point

        for (var j = 1; j < vertices.length; j += 1) {  // iterates over each vertex of the body starting at the second vertex
            canvasCtx.lineTo(vertices[j].x, vertices[j].y); // draws a line from the starting point to the next vertex, then from that vertex to another vertex etc etc
        }

        canvasCtx.lineTo(vertices[0].x, vertices[0].y); // closes the path and object shape by drawing a line from the last vertex to the starting vertex
    }

    canvasCtx.fillStyle = "white"
    canvasCtx.fill();
}


// function pong() {
//     Engine.update(engine, 1000 / 60)
//     canvas = this.document.querySelector("canvas.world");
//     var canvasCtx = canvas.getContext("2d");
//     canvasCtx.clearRect(bx, by, 10, 10);
//     function reset() {
//         canvasCtx.clearRect(0, 0, W, H);
//         bx = W / 2;
//         by = H / 2;
//         py = 300 - 600 * 0.1;
//         paddleHeight = 600 * 0.25;
//         moveRight = true;
//         tickRate = 1000;
//         canvasCtx.fillRect(px, py, 10, paddleHeight);
//         angleOfY = 0;
//     }
//     function ballMovX() {
//         if (moveRight) {
//             bx += 5;
//             if (
//                 py <= by &&
//                 by <= py + paddleHeight &&
//                 bx >= canvas.width - 25
//             ) {
//                 // checks if the ball will touch the paddle {
//                 // if the ball hits the paddle start moving the paddle left
//                 console.log("good hit");
//                 moveRight = false;
//                 angleOfY = Math.ceil((by - py - 70) / 15);
//                 // var dy = Math.ceil((by - py - 70) / 15);
//                 // if (dy > 0) {
//                 //     angleOfY = Math.ceil(dy);
//                 // } else {
//                 //     angleOfY = Math.floor(dy);
//                 // }
//                 console.log(angleOfY);
//             }
//             if (bx >= canvas.width) {
//                 reset();
//             }
//         } else {
//             moveRight = false; // keeps the ball from moving right
//             bx -= 5;
//             if (bx - 5 < 0) {
//                 // ball's x is less than the canvas size
//                 moveRight = true; // ball moves right again
//             }
//         }
//     }
//     function ballMovY() {
//         if (0 <= by && moveUp) {
//             by -= angleOfY;
//             // by -= 1;
//         } else {
//             moveUp = false;
//             if (by + 10 >= H - angleOfY) {
//                 console.log(by);
//                 moveUp = true;
//             } else {
//                 by += angleOfY;
//                 //by += 1;
//             }
//         }
//     }
//     ballMovX();
//     ballMovY();
//     canvasCtx.fillRect(bx, by, 10, 10);
// }

// function movePaddle(ev) {
//     canvas = this.document.querySelector("canvas.world");
//     var canvasCtx = canvas.getContext("2d");
//     switch (ev.key) {
//         case "ArrowDown":
//             if (py >= canvas.height - paddleHeight) {
//                 break;
//             } else {
//                 canvasCtx.clearRect(px, py, 10, paddleHeight);
//                 py += 10;
//                 canvasCtx.fillRect(px, py, 10, paddleHeight);
//                 break;
//             }
//         case "ArrowUp":
//             if (py <= 0) {
//                 break;
//             } else {
//                 canvasCtx.clearRect(px, py, 10, paddleHeight);
//                 py -= 10;
//                 canvasCtx.fillRect(px, py, 10, paddleHeight);
//                 break;
//             }
//     }
// }
