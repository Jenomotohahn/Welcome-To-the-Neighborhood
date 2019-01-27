const qs = questionServer;

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

const drawMovedImage = (image, x, y) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.drawImage(image, x, y);
  ctx.restore();
};

const step = () => {
  if (keys[key.LEFT]) {
    witchX -= 3;
  }
  if (keys[key.RIGHT]) {
    witchX += 3;
  }
  // if(keys[key.UP]){witchY -= 3};
  // if(keys[key.DOWN]){witchY += 3};
};

const draw = () => {
  ctx.clearRect(0, 0, ctxW, ctxH);
  ctx.drawImage(witch, witchX, witchY);
  ctx.drawImage(vampire, vampireX, vampireY);
  ctx.drawImage(werewolf, werewolfX, werewolfY);
};

window.addEventListener("keydown", e => {
  if (keys[e.keyCode] !== "undefined") {
    keys[e.keyCode] = true;
  }
});

window.addEventListener("keyup", e => {
  if (keys[e.keyCode] !== "undefined") {
    keys[e.keyCode] = false;
  }
});

document.getElementById("test").addEventListener("click", e => {
  alert("test");
  qs.loadQuestion(e);
});

const frame = () => {
  draw();
  step();
  window.requestAnimationFrame(frame);
};

frame();
