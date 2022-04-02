const canvasSketch = require("canvas-sketch");
const csRandom = require("canvas-sketch-util/random")
//var f = new FontFace('BIZUDPMincho', 'url(fonts/BIZUDPMincho-Regular.ttf)');
var f = new FontFace("VCRmono", "url(fonts/VCR_OSD_MONO_1.001.ttf)");

const settings = {
  dimensions: [1080, 1080],
};

let manager;

let text = "A";
let fontSize = 1200;
let fontFamily = "VCRmono";
fontFamily = 'serif'

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const numCols = Math.floor(width / cell);
  const numRows = Math.floor(height / cell);

  const numCells = numCols * numRows;

  typeCanvas.width = numCols;
  typeCanvas.height = numRows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = "black";
    typeContext.fillRect(0, 0, numCols, numRows);

    fontSize = numCols;

    typeContext.fillStyle = "white";
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = "top";
    //context.textAlign = "center";

    const metrics = typeContext.measureText(text);
    //console.log(metrics);

    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const tx = (numCols - mw) / 2 - mx;
    const ty = (numRows - mh) / 2 - my;

    typeContext.save();
    typeContext.translate(tx, ty);

    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();

    typeContext.fillText(text, 0, 0);
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, numCols, numRows).data;

    //context.drawImage(typeCanvas, 0, 0);

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center'

    for (let i = 0; i < numCells; i++) {
      const col = i % numCols;
      const row = Math.floor(i / numCols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];

      const glyph = getGlyph(r);

      context.fillStyle = "white"; //`rgb(${r},${g},${b})`;
      context.save();
      context.translate(x, y);
      context.translate(cell / 2, cell / 2);
      //context.fillRect(0,0,cell,cell)

      context.beginPath();
      //context.arc(0, 0, cell / 2, 0, Math.PI * 2);

      context.font = `${cell * 2}px ${fontFamily}`;

      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

      context.fillText(glyph, 0, 0);
      context.fill();

      context.restore();
      //console.log(typeData)
    }
  };
};

const getGlyph = (r) => {
  if (r < 50) return ""
  if (r < 100) return ".";
  if (r < 150) return csRandom.pick(['pies','to','ucieczka','dyrektor','obowiązek']);
  if (r < 200) return "+";
    
  const glyphs = '+_/='.split('');

  return csRandom.pick(glyphs);
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
