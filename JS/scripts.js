
function canvas() {
  canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.rect(0, 0, 300, 300);
    ctx.fill();
    stars();
    //makeShip();
  }
}

function stars() {
  for (i = 0; i <= 50; i++) {
    var x = Math.floor(Math.random() * 299);
    var y = Math.floor(Math.random() * 299);
    //for randomizing colors
    var r = Math.floor(Math.random() * (256 - 100) + 100);
    var g = Math.floor(Math.random() * (256 - 100) + 100);
    var b = Math.floor(Math.random() * (256 - 100) + 100);
    console.log("rgb(" + r + "," + g + "," + b + ")");
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    //ctx.fillStyle = "white";

    if (x < 30 || y < 30) ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
}

function makeShip() {
}
