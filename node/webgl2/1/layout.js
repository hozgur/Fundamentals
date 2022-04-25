import { dialog } from './node_modules/@hozgur/easy-ui/index.js';

function init(width,height,placeholder) {

    const dlg = new dialog();
    window.dlg = dlg;
    const layout = `
col
    row  c_dark
        label WEBGL_Test_1
    row  c_dark
        canvas id=canvas1 style=width:${width}px;height:${height}px;background-color:black;
        canvas id=canvas2 style=width:${width}px;height:${height}px;background-color:gray;

`;
    dlg.init(layout, placeholder);
} 

export { init };