const canvasSketch = require('canvas-sketch');
const rd = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080]
};

const sketch = ({
  context,
  width,
  height
}) => {

  const agents = [];

  for (i = 0; i < 40; i++) {
    const x = rd.range(0, width);
    const y = rd.range(0, height);
    agents.push(new Agent(x, y));
  }

  return ({
    context,
    width,
    height
  }) => {

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    //const agentA = new Agent(800, 400);
    //agentA.draw(context);

    agents.forEach((agent, i) => {
      agent.draw(context)
    });
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};


class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.radius = 10;
  }
  draw(context) {
    context.fillStyle = "#000";
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
};