
var obj = {
    message: 'Hello World',
    displayOutline: false,

    maxSize: 6.0,
    speed: 5,

    height: 10,
    noiseStrength: 10.2,
    growthSpeed: 0.2,

    type: 'three',

    explode: function () {
      alert('Bang!');
    },

    color0: "#ffae23", // CSS string
    color1: [ 0, 128, 255 ], // RGB array
    color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
    color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};

var gui = new dat.gui.GUI();
gui.useLocalStorage = true;
gui.remember(obj);

gui.add(obj, 'message');
gui.add(obj, 'displayOutline');
gui.add(obj, 'explode');

gui.add(obj, 'maxSize').min(-10).max(10).step(0.25);
gui.add(obj, 'height').step(5); // Increment amount

// Choose from accepted values
gui.add(obj, 'type', [ 'one', 'two', 'three' ] );

// Choose from named values
gui.add(obj, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );

var f1 = gui.addFolder('Colors');
const back_color = f1.addColor(obj, 'color0');
f1.addColor(obj, 'color1');
f1.addColor(obj, 'color2');
f1.addColor(obj, 'color3');

var f2 = gui.addFolder('Another Folder');
f2.add(obj, 'noiseStrength');

var f3 = f2.addFolder('Nested Folder');
f3.add(obj, 'growthSpeed');

obj['Button with a long description'] = function () {
    console.log('Button with a long description pressed');
};

gui.add(obj, 'Button with a long description');

back_color.onChange(function(value) {
    window.document.body.style.backgroundColor = value;
    });

window.document.body.onload = function() {
    window.document.body.style.backgroundColor =back_color.getValue();
    console.log(back_color.getValue());
}