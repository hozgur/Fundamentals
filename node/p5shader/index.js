
import { dialog } from './node_modules/@hozgur/easy-ui/index.js';

const dlg = new dialog();

window.dlg = dlg;

const layout = `
col
    row  c_dark
        label p5js_Shader_Test

    div id=p5js_placeholder
`;

let theShader;

window.onload = function () {    
    dlg.init(layout, "myapp");
    let myp5 = new p5(sketch);
};


let sketch = function (p) {
    let x = 0;
    let y = 0;
    
    const w = 50;
    const h = 50;
    let colorcount = 0;
    let lastcolor = null;

    p.preload = function () {
        theShader = p.loadShader('shader.vert', 'shader.frag');
    };

    p.setup = function () {
        let cvs = p.createCanvas(800, 400,p.WEBGL);
        //let cvs = p.createCanvas(700, 410);
        cvs.parent('p5js_placeholder');
    };

    p.draw = function () {
        p.background(140);
        theShader.setUniform('u_resolution', [p.width, p.height]);
        theShader.setUniform('u_time', p.millis() / 1000.0);
        theShader.setUniform('u_mouse', [p.mouseX, p.mouseY]);
        p.shader(theShader);
        p.rect(0, 0, 0, 0);
    };
};
