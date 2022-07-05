
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const logo = new Image();
let pixels;
logo.addEventListener('load', function() {
    console.log(canvas.width,canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(logo, 0, 0);
    pixels = createPixelData(logo);
    // Render the pixels on every frame
    render();
}, false);
logo.src = 'ait-logo.png';



class pixel {
    constructor(coord, clr,boundary) {
        this.coord = coord;
        this.clr = clr;
        this.boundary = boundary;
        this.init_coord = [Math.random() * boundary.w, Math.random() * boundary.h];
        this.init_clr = hslToRgb(Math.random(),1,1)
        this.velocity = [Math.random() * 2 - 1, Math.random() * 2 - 1];
    }
    move() {
        this.init_coord[0] += this.velocity[0];
        this.init_coord[1] += this.velocity[1];
        this.coord[0] = this.init_coord[0] % this.boundary.w;
        this.coord[1] = this.init_coord[1] % this.boundary.h;
    }

    get x() {
        return this.init_coord[0];
    }
    get y() {
        return this.init_coord[1];
    }
}

function createPixelData(img) {
    let w = img.width;
    let h = img.height;
    console.log(w, h);
    let imgData = ctx.getImageData(0, 0, w, h);
    let data = imgData.data;
    let pixels = [];
    for (let i = 0; i < data.length; i += 4) {
        pixels.push(new pixel(i / 4 % w, Math.floor(i / 4 / w), data[i], data[i + 1], data[i + 2]));
    }
    return pixels;
}

function drawPixels(pixels) {
    for (let i = 0; i < pixels.length; i++) {
        ctx.fillStyle = `rgb(${pixels[i].r}, ${pixels[i].g}, ${pixels[i].b})`;
        ctx.fillRect(pixels[i].x, pixels[i].y, 1, 1);
    }
}

function render() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].move();
        ctx.fillStyle = `rgb(${pixels[i].r}, ${pixels[i].g}, ${pixels[i].b})`;
        ctx.fillRect(pixels[i].x, pixels[i].y, 1, 1);
    }
    window.requestAnimationFrame(render);
}
