const H = 600;

function moveBallDown() {
    var ball = $(".ball");
    ball.animate({ marginTop: "590px" }, { duration: 1000, easing: "linear" });
}
function moveBallUp() {
    $(".ball").animate(
        { marginTop: "0px" },
        { duration: 1000, easing: "linear" }
    );
}
setInterval(() => {
    moveBallDown();
    moveBallUp();
}, 1000);
