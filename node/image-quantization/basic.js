const PNG = require('pngjs').PNG;
const iq = require('image-q');
const fs = require('fs');



fs.createReadStream("file.png")
    .pipe(
        new PNG({
            filterType: 4,
        })
    )
    .on("parsed", function () {
        let data = this.data;
        let width = this.width;
        let height = this.height;

        const inPointContainer = iq.utils.PointContainer.fromUint8Array(data, width, height);

        // convert
        const palette = iq.buildPaletteSync([inPointContainer], {
            colors: 128
        });        
        const outPointContainer = iq.applyPaletteSync(inPointContainer, palette);

        const image_data = outPointContainer.toUint8Array();
        const png = new PNG({
            width: width,
            height: height,
            filterType: 4,
        });
        png.data = image_data;
        png.pack().pipe(fs.createWriteStream("file2.png"));

        
    });