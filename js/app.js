let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let ctxW = canvas.width;
let ctxH = canvas.height;

let witch = new Image();
witch.src = "assets/witch.png";

let vampire = new Image();
vampire.src = "assets/vampire.png";

let werewolf = new Image();
werewolf.src = "assets/werewolf.png";

let witchX = 370;
let witchY = 400;
let vampireX = 500;
let vampireY = 400;
let werewolfX = 200;
let werewolfY = 400;
let playerXLoc = 270;
let playerYLoc = 400;
let playerSpeed = 2;

let key = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

let keys = {
  38: false,
  40: false,
  37: false,
  39: false
};

window.addEventListener("keydown", e => {
  if (keys[e.keyCode] !== "undefined") {
    keys[e.keyCode] = true;
    console.log("hello");
  }
});

window.addEventListener("keyup", e => {
  if (keys[e.keyCode] !== "undefined") {
    keys[e.keyCode] = true;
  }
});

const drawMovedImage = (image, x, y) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.drawImage(image, x, y);
  ctx.restore();
};

const step = () => {
  if (keys[key.Left]) {
    witchX += 3;
  }
  if (keys[key.Right]) {
    witchX -= 3;
  }
};

const draw = () => {
  ctx.clearRect(0, 0, ctxW, ctxH);
  drawMovedImage(witch, witchX, witchY);
  ctx.drawImage(vampire, vampireX, vampireY);
  ctx.drawImage(werewolf, werewolfX, werewolfY);
};

const frame = () => {
  draw();
  step();
  window.requestAnimationFrame(frame);
};

frame();
