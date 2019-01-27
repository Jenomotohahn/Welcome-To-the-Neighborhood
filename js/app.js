const qs = questionServer;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let ctxW = canvas.width;
let ctxH = canvas.height;

let witch = new Image();
witch.src = "assets/img/witch.png";

let vampire = new Image();
vampire.src = "assets/img/vampire.png";

let werewolf = new Image();
werewolf.src = "assets/img/werewolf.png";

let player = new Image();
player.src = "assets/img/player.png";

let witchHouse = new Image();
witchHouse.src = "assets/img/witchhouse.png";
wHHeight = witchHouse.height * 0.6;
wHWidth = witchHouse.width * 0.6;

let werewolfHouse = new Image();
werewolfHouse.src = "assets/img/werewolfhouse.png";
wWHeight = werewolfHouse.height * 0.4;
wWWidth = werewolfHouse.width * 0.4;

let road = new Image();
road.src = "assets/img/road.png";
let imgCat = new Image();
imgCat.src = "assets/img/cat2.png";

let witchX = 400;
let witchY = 500;
let vampireX = 600;
let vampireY = 500;
let werewolfX = 200;
let werewolfY = 500;
let playerX = 900;
let playerY = 500;
let bMoon = false;
let bCanPlayWolfSound = true;
let bCanPlayWitchSound = true;
let bCanPlayVampSound = true;
const objCat = {
  x: 800,
  y: 500,
  img: imgCat,
  bCanPlaySound: true
};
const objPlayer = {
  x: 900,
  y: 500,
  img: player,
  w: 60
};

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
    playerX -= 3;
    objPlayer.x -= 3;
  }
  if (keys[key.RIGHT]) {
    playerX += 3;
    objPlayer.x += 3;
  }
  // if(keys[key.UP]){
  //     //some code to check if the player is interacting with a neighbor.If yes:
  //     //text box to come up and with selectable multiple choice.
  // };
};

const draw = () => {
  ctx.clearRect(0, 0, ctxW, ctxH);
  ctx.drawImage(road, 0, 0);
  ctx.drawImage(witchHouse, 90, 250, wHWidth, wHHeight);
  ctx.drawImage(werewolfHouse, -30, 360, wWWidth, wWHeight);
  ctx.drawImage(witch, witchX, witchY);
  ctx.drawImage(vampire, vampireX, vampireY);
  ctx.drawImage(werewolf, werewolfX, werewolfY);
  // ctx.drawImage(player, playerX, playerY);
  ctx.drawImage(objPlayer.img, objPlayer.x, objPlayer.y);
  if (bMoon) {
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText("DevLeague", 115, 160);
    ctx.font = "12px Arial";
    ctx.fillText("Cohort27", 135, 180);
  }
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
  qs.loadQuestion(e);
});

function collisionDetect() {
  if (objPlayer.x === 570 && bCanPlayVampSound) {
    // if (playerX === 570 && bCanPlayVampSound) {
    console.log("hello vampire");
    var audioVam = new Audio("assets/vamp.mp3");
    audioVam.loop = false;
    audioVam.play();
    bCanPlayVampSound = false;
    bMoon = true;
    // speak(canvas, "You should try my garlic bread!");
    setTimeout(function() {
      bCanPlayVampSound = true;
      bMoon = false;
    }, 2000);
  }
  if (
    objPlayer.x + objPlayer.w >= 400 &&
    objPlayer.x <= 450 &&
    bCanPlayWitchSound
  ) {
    // if (playerX === 360 && bCanPlayWitchSound) {
    console.log("hello witch", objPlayer.x, objPlayer.x + objPlayer.w);
    var audioWitch = new Audio("assets/witch laugh.mp3");
    audioWitch.loop = false;
    audioWitch.play();
    console.log("sound played and turned off");

    bMoon = true;
    bCanPlayWitchSound = false;
    setTimeout(function() {
      bCanPlayWitchSound = true;
      console.log("sound back on");
      // speak(objPlayer, "Has anyone seen my broom?");
      bMoon = false;
    }, 10000);
  }
  if (objPlayer.x === 180 && bCanPlayWolfSound) {
    // if (playerX === 180 && bCanPlayWolfSound) {
    console.log("hello werewolf");
    var audioWolf = new Audio("assets/werewolfsound.mp3");
    audioWolf.loop = false;
    audioWolf.play();
    bMoon = true;
    bCanPlayWolfSound = false;
    setTimeout(function() {
      bCanPlayWolfSound = true;
      bMoon = false;
    }, 2000);
  }
}

const frame = () => {
  draw();
  step();
  collisionDetect();
  window.requestAnimationFrame(frame);
};

frame();

window.onload = function() {
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};
