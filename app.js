

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d'); 
let ctxW = canvas.width;
let ctxH = canvas.height;

//get player id
let player = document.getElementById('Player');


let key = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
};

let keys = {
    38: false,
    40: false,
    37: false,
    39: false,
};

window.addEventListener('keydown', e => {
    if(keys[e.keyCode] !== 'undefined'){
        keys[e.keyCode] = true;
    };
});

window.addEventListener('keyup', e => {
    if(keys[e.keyCode] !== 'undefined'){
        keys[e.keyCode] = true;
    };
});

const step = () => {

};

const draw = () => {
    ctx.clearRect( 0, 0, ctxW, ctxH);
    ctx.drawImage(image, 0,0);
}

const frame = () => {
    window.requestAnimationFrame(frame);
};

frame();