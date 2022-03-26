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

    const pointA = new Point(800, 400, 10);
    const pointB = new Point(600, 200, 20);

    context.beginPath();
    context.arc(pointA.x, pointA.y, pointA.radius, 0, Math.PI * 2);
    context.arc(pointB.x, pointB.y, pointB.radius, 0, Math.PI * 2);
    context.fillStyle = "#000";
    context.fill();
  };
};

canvasSketch(sketch, settings);

class Point {

  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}