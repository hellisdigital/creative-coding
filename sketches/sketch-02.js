const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  return ({
    context,
    width,
    height
  }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#000';

    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    context.save();

    context.translate(x, y);
    context.rotate(0.6);
    context.beginPath();
    context.rect(-w / 2, -h / 2, w, h);
    context.fill();

    // reset the context to 0,0, reset translations and rotations
    context.restore();

    context.translate(100, 400);

    context.beginPath();
    context.rect(0, 0, w / 4, h / 4)
    context.arc(0, 0, 50, 0, Math.PI * 2);
    context.fill();

  };
};

canvasSketch(sketch, settings);