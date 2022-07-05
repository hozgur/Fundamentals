
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const logo = new Image();
let pixels;
let frames = 0;
logo.addEventListener('load', function() {
    console.log(canvas.width,canvas.height);
    //ctx.fillStyle = '#000';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
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
        this.init_coord = [boundary.w/2,boundary.h/2];
        this.init_clr = clr;
        //this.init_coord = [Math.random() * boundary.w, Math.random() * boundary.h];
        this.init_clr = hslToRgb(Math.random(),1,0.5)
        let angle = Math.random() * Math.PI * 2;
        let speed = Math.random() * 5 + 0.01;
        this.velocity = [Math.cos(angle) * speed, Math.sin(angle) * speed];
        this.accel = [Math.random() * .01 , Math.random() * .01];
        this.velocity2 = undefined;
        this.rgbDiff = undefined;
        this.speedDiv = 60;
    }
    move1() {
        this.init_coord[0] += this.velocity[0];
        this.init_coord[1] += this.velocity[1];        
        // this.init_coord[0] = this.init_coord[0] % this.boundary.w;
        // this.init_coord[1] = this.init_coord[1] % this.boundary.h;
    }

    move2() {
        if(this.velocity2 === undefined) {
            let dx = this.init_coord[0] - this.coord[0];
            let dy = this.init_coord[1] - this.coord[1];
            let angle = Math.atan2(-dy, -dx);
            let speed = Math.sqrt(dx * dx + dy * dy)/this.speedDiv;
            this.velocity2 = [Math.cos(angle) * speed, Math.sin(angle) * speed];
            this.rgbDiff = [this.init_clr[0] - this.clr[0], this.init_clr[1] - this.clr[1], this.init_clr[2] - this.clr[2]];
            this.rgbDiff = [this.rgbDiff[0]/this.speedDiv, this.rgbDiff[1]/this.speedDiv, this.rgbDiff[2]/this.speedDiv];
        }
        
        let dx = this.init_coord[0] - this.coord[0];
        let dy = this.init_coord[1] - this.coord[1];
        let dist = Math.sqrt(dx * dx + dy * dy);
        if(dist > .1) {
            this.init_coord[0] += this.velocity2[0];
            this.init_coord[1] += this.velocity2[1];
            this.init_clr[0] -= this.rgbDiff[0];
            this.init_clr[1] -= this.rgbDiff[1];
            this.init_clr[2] -= this.rgbDiff[2];
        }
        else {
            //this.init_coord[0] = this.coord[0] + Math.random() * .5;
            //this.init_coord[1] = this.coord[1] + Math.random() * .5;
        }                
    }

    move3() {
        this.init_coord[0] += this.velocity2[0];
        this.init_coord[1] += this.velocity2[1];
    }

    get x() {
        return this.init_coord[0];
    }
    get y() {
        return this.init_coord[1];
    }
    get color() {
        const c = this.init_clr;
        return `rgb(${c[0]},${c[1]},${c[2]})`;
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
        if (data[i + 3] > 0) {
            let c = [data[i], data[i + 1], data[i + 2]];
            pixels.push(new pixel([i / 4 % w, Math.floor(i / 4 / w)],c,{w,h}));
        }
    }
    return pixels;
}

function render() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pixels.length; i++) {
        if(frames < 90)
            pixels[i].move1();
        else{
            if(frames < 200)
                pixels[i].move2();
            else
                pixels[i].move3();
        }                 
        ctx.fillStyle = pixels[i].color;
        ctx.fillRect(pixels[i].x, pixels[i].y, 1, 1);        
    }
    frames++;
    window.requestAnimationFrame(render);
}
