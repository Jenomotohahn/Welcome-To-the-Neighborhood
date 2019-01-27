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
wHHeight = witchHouse.height * .6;
wHWidth = witchHouse.width * .6;

let werewolfHouse = new Image();
werewolfHouse.src = "assets/img/werewolfhouse.png"
wWHeight = werewolfHouse.height * .4;
wWWidth = werewolfHouse.width * .4;

let road = new Image();
road.src = "assets/img/road.png";

let witchX = 400;
let witchY = 500;
let vampireX = 600;
let vampireY = 500;
let werewolfX = 200;
let werewolfY = 500;
let playerX = 900;
let playerY = 500;

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
    if(keys[key.LEFT]){playerX -= 3};
    if(keys[key.RIGHT]){playerX += 3};
    // if(keys[key.UP]){
    //     //some code to check if the player is interacting with a neighbor.If yes:
    //     //text box to come up and with selectable multiple choice. 
    // };
};

const draw = () => {
    ctx.clearRect( 0, 0, ctxW, ctxH);
    ctx.drawImage(road, 0 ,0);
    ctx.drawImage(witchHouse, 90, 250, wHWidth, wHHeight);
    ctx.drawImage(werewolfHouse, -30, 360, wWWidth, wWHeight);
    ctx.drawImage(witch, witchX, witchY);
    ctx.drawImage(vampire,vampireX, vampireY);
    ctx.drawImage(werewolf, werewolfX, werewolfY);
    ctx.drawImage(player, playerX, playerY);

};

window.addEventListener('keydown', e => {
    if(keys[e.keyCode] !== 'undefined'){
        keys[e.keyCode] = true;
    };
});

window.addEventListener('keyup', e => {
    if(keys[e.keyCode] !== 'undefined'){
        keys[e.keyCode] = false;
    };
});
const frame = () => {
  draw();
  step();
  window.requestAnimationFrame(frame);
};

frame();

window.onload = function(){
    if(!window.location.hash){
        window.location = window.location + '#loaded';
        window.location.reload();
    };
}
