var shipX = 0;
var shipY = 0;
var canvas;
var ctx;
var canvas2;
var ctx2;
var back = new Image();
var oldBack = new Image();
var ship = new Image();
var shipX = 0;
var shipY = 0;
var oldShipX = 0;
var oldShipY = 0;
var direction = "R";
var score = 0;


function canvas() {
  canvas = document.getElementById("canvas");
  canvas2 = document.getElementById("score");

  if (canvas2.getContext) {
    ctx2 = canvas2.getContext("2d");
  }

  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.rect(0, 0, 300, 300);
    ctx.fill();

    back = ctx.getImageData(0, 0, 30, 30);

    stars();
    makeShip();
    drawAsteriods();
  }

  gameLoop = setInterval(doGameLoop, 16);
  window.addEventListener('keydown', whatKey, true);
}

function stars() {
  for (i = 0; i <= 50; i++) {
    var x = Math.floor(Math.random() * 299);
    var y = Math.floor(Math.random() * 299);
    //for randomizing colors
    var r = Math.floor(Math.random() * (150 - 60) + 60);
    //var g = Math.floor(Math.random() * (256 - 100) + 100);
    var b = Math.floor(Math.random() * (200 - 100) + 100);
    ctx.fillStyle = "rgb(" + r + "," + r + "," + b + ")";

    if (x < 30 || y < 30) ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();

    oldBack = ctx.getImageData(0, 0, 30, 30);
  }
}

function makeShip() {
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

  // Save ship data
  ship = ctx.getImageData(0, 0, 30, 30);

  // Erase it for now
  ctx.putImageData(oldBack, 0, 0);
}

function doGameLoop() {
  // old background to erase ship
  ctx.putImageData(oldBack, oldShipX, oldShipY);

  //ship in new position
  ctx.putImageData(ship, shipX, shipY);
}

function whatKey(evt) {
  //flag to put variables back at edge of makeShip
  var flag = 0;
  oldShipX = shipX;
  oldShipY = shipY;
  oldBack = back;

  switch (evt.keyCode) {
    //left
    case 37:
      shipX = shipX -30;
      if (shipX < 0) {
        //at edge reset ship position and set flag
        shipX = 0;
        flag = 1;
      }
      break;
    //right
    case 39:
      shipX = shipX += 30;
      if (shipX > 270) {
        shipX = 270;
        flag = 1;
      }
      break;
    //down
    case 40:
      shipY = shipY + 30;
      if (shipY > 270) {
        shipY = 270;
        flag = 1;
      }
      break;
    //up
    case 38:
      shipY = shipY - 30;
      if (shipY < 0) {
        shipY = 270;
        flag = 1;
      }
      break;
    //'A' key for energy field
    case 65:
      score += 20;
      flag = 1;
      energyStrike();
      break;
    default:
      flag = 1;
      alert('Use arrow keys to navigate');
  }

  //if flag, ship can't move so put everything back the way it was
  if (flag) {
    shipX = oldShipX;
    shipY = oldShipY;
    back = oldBack;
    score --;
  } else {
    //otherwise get background where the ship will go, so you can redraw the backgorund when the ship moves again
    back = ctx.getImageData(shipX, shipY, 30, 30);
  }

  score = score + 1;

  //print score
  ctx2.clearRect(0, 0, 300, 300);
  ctx2.font = "20 point Ariel";
  ctx2.fillText("Score", 20, 15);
  ctx2.fillText(score, 100, 15);

  collisionTest();
}

function collisionTest() {
  var clipWidth = 20;
  var clipDepth = 20;
  var clipLength = clipWidth * clipDepth;
  var clipOffset = 5;
  var whatColor = ctx.getImageData(shipX + clipOffset, shipY + clipOffset, clipWidth, clipDepth);

  for (var i = 0; i < clipLength * 4; i += 4) {
    if (whatColor.data[i] == 255) {
      alert("red");
      break;
    }
    if (whatColor.data[i+2] == 255) {
      alert("blue");
      break;
    }
  }
}

function drawAsteriods() {
  for (i = 0; i <= 20; i++) {
    //random positions for asteroids
    var a = Math.floor(Math.random() * 299);
    var b = Math.floor(Math.random() * 299);
    ctx.fillStyle = "rgb(255,0,0)";
    //give asteroids map boundary padding
    if (a > 40 && b > 40 && a < 270 && b <270) {
      ctx.beginPath();
      ctx.arc(a, b, 10, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
    } else { --i };
  }

  ctx.fillStyle = "rgb(0,0,255)";
  ctx.beginPath();
  ctx.rect(270,270,30,30);
  ctx.closePath();
  ctx.fill();
}
