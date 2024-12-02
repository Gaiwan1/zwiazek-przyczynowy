import "./index.css";
import * as common from "../common.tsx";

import p5, { Vector } from "p5";
import * as math from "mathjs";

const sketch = (p: p5) => {
  // Lorenz
  const deltaTime = 0.01;

  const σ = 10;
  const ρ = 28;
  const β = 8.0 / 3;

  let x = 1;
  let y = 1;
  let z = 1;

  let x2 = p.random(0.995, 1.005);
  let y2 = p.random(0.995, 1.005);
  let z2 = p.random(0.995, 1.005);

  let lorenz: p5.Vector[] = [];
  let lorenz2: p5.Vector[] = [];

  p.setup = (): void => {
    common.sharedSetup(p);
  };

  p.windowResized = (): void => {
    p.setup();
  };

  p.draw = (): void => {
    common.sharedDraw(p);
    p.fill(0, 0, 0, 0);

    p.translate(p.width / 2, p.height / 2);
    p.scale(15);

    const dx = σ * (y - x) * deltaTime;
    const dy = (x * (ρ - z) - y) * deltaTime;
    const dz = (x * y - β * z) * deltaTime;

    const dx2 = σ * (y2 - x2) * deltaTime;
    const dy2 = (x2 * (ρ - z2) - y2) * deltaTime;
    const dz2 = (x2 * y2 - β * z2) * deltaTime;

    x = x + dx;
    y = y + dy;
    z = z + dz;

    x2 = x2 + dx2;
    y2 = y2 + dy2;
    z2 = z2 + dz2;

    lorenz.push(p.createVector(x, y));
    lorenz2.push(p.createVector(x2, y2));

    p.beginShape();
    for (const vec of lorenz) {
      p.curveVertex(vec.x, vec.y, 0);
    }
    p.endShape();

    p.stroke(common.accentColor);
    p.beginShape();
    for (const vec2 of lorenz2) {
      p.curveVertex(vec2.x, vec2.y, 0);
    }
    p.endShape();
  };
};

const canvas = document.getElementById("id-canvas-wrapper"); // }}}
new p5(sketch, canvas!);
