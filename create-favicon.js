const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function createPNGFavicon() {
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext('2d');

    // Draw background
    ctx.fillStyle = '#1a1b26';
    ctx.beginPath();
    ctx.roundRect(0, 0, 32, 32, 3);
    ctx.fill();

    // Draw terminal symbols
    ctx.strokeStyle = '#7aa2f7';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw >
    ctx.beginPath();
    ctx.moveTo(6, 8);
    ctx.lineTo(14, 16);
    ctx.lineTo(6, 24);
    ctx.stroke();

    // Draw _
    ctx.beginPath();
    ctx.moveTo(16, 24);
    ctx.lineTo(26, 24);
    ctx.stroke();

    // Save to PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./public/favicon.png', buffer);
}

createPNGFavicon();
