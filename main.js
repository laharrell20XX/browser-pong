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
var Body = Matter.Body


//creates an engine and sets defaults of the world
var engine = Engine.create()
engine.world.gravity.y = 0



// creates the pong objects and adds them to the world
var pongBall = Bodies.rectangle(W / 2 - 5, H / 2 - 5, 10, 10, { frictionAir: 0 })
var floor = Bodies.rectangle(0, 0, W * 2, 1, { isStatic: true })
var ceiling = Bodies.rectangle(0, H, W * 2, 1, { isStatic: true })
var rightPaddle = Bodies.rectangle(W - 10, 300 - H * 0.1, 10, H * 0.25, { frictionAir: 0 })
Body.applyForce(pongBall, pongBall.position, { x: .001, y: 0 }) // only keeps track of initial ball creation
World.add(engine.world, [rightPaddle, pongBall, floor, ceiling])

// const px = 1182;
// var py = 300 - H * 0.1;
// var paddleHeight = H * 0.25;
// var moveRight = true; // state of movement on the ball, if true, ball is moving right; if false ball is moving left
// var angleOfY = 0;
// var moveUp = true;

window.onload = function () {
    window.addEventListener("keydown", function (ev) {
        movePaddle(ev);
    });

    this.setInterval(() => {
        newPong()
    }, tickRate / 60); // 30 times per second
};

function movePaddle(ev) {
    switch (ev.key) {
        case "ArrowUp":
            Body.applyForce(rightPaddle, rightPaddle.position, { x: 0, y: -0.002 })
            break
        case "ArrowDown":
            Body.applyForce(rightPaddle, rightPaddle.position, { x: 0, y: 0.002 })
            break
    }

}

// start of newPong function
function newPong() {
    render()
    if (pongBall.position.x >= W) {
        reset()
    }
}

function reset() {
    Body.setPosition(pongBall, { x: W / 2 - 5, y: H / 2 - 5 })
}

function render() {
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
