const canvasSketch = require('canvas-sketch');
const rd = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [1080, 1080],
  animate: true
};

// animation without canvas sketch
// animate();
const animate = () => {
  console.log('a');
  requestAnimationFrame(animate);
}

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

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const otherAgent = agents[j];

        const dist = agent.pos.getDistance(otherAgent.pos);

        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(otherAgent.pos.x, otherAgent.pos.y);
        context.stroke();
      }
    }

    agents.forEach((agent, i) => {
      agent.update();
      agent.draw(context);
      agent.wrap(width, height);
      //agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx ** 2 + dy ** 2);
  }
};


class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(rd.range(-1, 1), rd.range(-1, 1));
    this.radius = rd.range(4, 12);
  }

  bounce(width, height) {

    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap(width, height) {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;

    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;

  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
};