

import * as WEBGL from './webgl.js';
import * as LAYOUT from './layout.js';

let img = new Image();
let canvas2;
let counter = 0;
window.onload = function () {       
    LAYOUT.init(400, 400, 'myapp');
    WEBGL.loadFile('shader1.frag').then(shaderText => {
        console.log(shaderText);
        }); 
        
    WEBGL.initWebGL('canvas1');
    img.src = './ben.jpg';
    canvas2 = document.getElementById('canvas2');
    img.onload = function () {
        
       drawImage();
    };
};

function drawImage() {
    let dd = canvas2.getContext('2d');
    dd.drawImage(img, counter, 300, 400, 400, 0, 0, 400, 400);
    counter+=20;
    if(counter > 1000) {
        counter = 0;
    }
    requestAnimationFrame(drawImage);
}