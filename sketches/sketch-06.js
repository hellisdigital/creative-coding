const canvasSketch = require("canvas-sketch");

//var f = new FontFace('BIZUDPMincho', 'url(fonts/BIZUDPMincho-Regular.ttf)');
var f = new FontFace("VCRmono", "url(fonts/VCR_OSD_MONO_1.001.ttf)");

const settings = {
  dimensions: [1080, 1080],
};

let manager;

let text = "A";
let fontSize = 1200;
let fontFamily = "VCRmono";
//fontFamily = 'serif'

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#000";
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = "top";
    //context.textAlign = "center";

    const metrics = context.measureText(text);
    console.log(metrics);

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (width - mw) / 2 - mx;
    const ty = (height - mh) / 2 - my;

    context.save();
    context.translate(tx, ty);

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();
    context.fillText(text, 0, 0);
    context.restore();
  };
};

f.load().then(function (loaded_face) {
  document.fonts.add(loaded_face);

  const onKeyUp = (e) => {
    console.log(e);
    text = e.key.toUpperCase();
    manager.render();
  };

  document.addEventListener("keyup", onKeyUp);

  const start = async () => {
    manager = await canvasSketch(sketch, settings);
  };

  start();
});
