const sharp = require('sharp');

// Memory Test This is maximum image size for sharp!
// Generate RGB Gaussian noise
sharp({
    create: {
      width: 16383,
      height: 16383,
      channels: 3,
      noise: {
        type: 'gaussian',
        mean: 128,
        sigma: 30
      }
   }
  }).toFile('noise.png');