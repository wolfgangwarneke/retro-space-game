
function canvas() {
  canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.rect(0, 0, 300, 300);
    ctx.fill();
    stars();
    makeShip();
  }
}

function stars() {
  for (i = 0; i <= 50; i++) {
    var x = Math.floor(Math.random() * 299);
    var y = Math.floor(Math.random() * 299);
    //for randomizing colors
    var r = Math.floor(Math.random() * (230 - 60) + 60);
    //var g = Math.floor(Math.random() * (256 - 100) + 100);
    var b = Math.floor(Math.random() * (256 - 100) + 100);
    ctx.fillStyle = "rgb(" + r + "," + r + "," + b + ")";

    if (x < 30 || y < 30) ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
}

function makeShip() {
  console.log(123);
  // Draw saucer bottom.
  ctx.beginPath();
  ctx.moveTo(28.4, 16.9);
  ctx.bezierCurveTo(28.4, 19.7, 22.9, 22.0, 16.0, 22.0);
  ctx.bezierCurveTo(9.1, 22.0, 3.6, 19.7, 3.6, 16.9);
  ctx.bezierCurveTo(3.6, 14.1, 9.1, 11.8, 16.0, 11.8);
  ctx.bezierCurveTo(22.9, 11.8, 28.4, 14.1, 28.4, 16.9);
  ctx.closePath();
  ctx.fillStyle = "rgb(160, 160, 160)";
  ctx.fill();

  // Draw saucer top.
  ctx.beginPath();
  ctx.moveTo(22.3, 12.0);
  ctx.bezierCurveTo(22.3, 13.3, 19.4, 14.3, 15.9, 14.3);
  ctx.bezierCurveTo(12.4, 14.3, 9.6, 13.3, 9.6, 12.0);
  ctx.bezierCurveTo(9.6, 10.8, 12.4, 9.7, 15.9, 9.7);
  ctx.bezierCurveTo(19.4, 9.7, 22.3, 10.8, 22.3, 12.0);
  ctx.closePath();
  ctx.fillStyle = "rgb(51, 190, 0)";
  ctx.fill();
}
