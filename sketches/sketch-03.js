const canvasSketch = require('canvas-sketch');

const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random')
const settings = {
  dimensions: [1080, 1080],
  animate: true,
  playbackRate: 'throttle',
  fps: 5
};

const sketch = () => {
  return ({
    context,
    width,
    height,
    playhead
  }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#000';

    let cx = width * 0.5;
    let cy = height * 0.5;



    const w = width * 0.01;
    const h = height * 0.1;

    const num = 30;
    let radius = width * 0.3;

    cx = 0;
    cy = 0;
    radius = width * 0.7

    let x, y;
    for (let i = 0; i < num; i++) {

      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle)

      context.save();
      context.translate(x, y);
      context.rotate(-angle);

      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(-w / 2, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -0.5), slice * random.range(1, 3.5));
      context.stroke();
      context.restore();
    }


  };
};

canvasSketch(sketch, settings);