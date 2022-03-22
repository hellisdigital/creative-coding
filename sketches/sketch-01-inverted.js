const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
  //dimensions: 'A4',
  //pixelsPerInch: 300,
  //orientation: 'landscape'
};

const sketch = () => {
  return ({ context, width, height }) => {

    context.fillStyle = '#000';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.005;
    context.strokeStyle = '#fff'

    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.03;
    const inital_x = width * 0.17;
    const inital_y = height * 0.17;

    const off = width * 0.02;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = inital_x + (w + gap) * i;
        y = inital_y + (h + gap) * j;
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() > 0.5) {
          context.beginPath();
          context.rect(x + off/2, y + off/2, w - off, h - off);
          context.stroke();
        }
      }
    }

  };
};

canvasSketch(sketch, settings);
