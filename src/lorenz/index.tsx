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

  const randStart = 10;
  const randDifference = 0.005;

  let x = p.random(-randStart, randStart);
  let y = p.random(-randStart, randStart);
  let z = 0;
  const xConst = x;
  const yConst = y;

  let x2 = x + p.random(-randDifference, randDifference);
  let y2 = y + p.random(-randDifference, randDifference);
  let z2 = 0;
  const xConst2 = x2;
  const yConst2 = y2;

  let lorenz: p5.Vector[] = [];
  let lorenz2: p5.Vector[] = [];
  let scale: number;

  function l1norm(x: number, y: number): number {
    return p.abs(x) + p.abs(y);
  }

  // let angle = 0;

  p.setup = (): void => {
    common.sharedSetup(p);
    scale = 14 * common.scaleFactor;
  };

  p.windowResized = (): void => {
    p.setup();
  };

  p.draw = (): void => {
    common.sharedDraw(p);
    p.fill(0, 0, 0, 0);
    p.translate(p.width / 2, p.height / 2);

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
    // p.push();
    // p.strokeWeight(0);
    // p.fill(0, 0, 0, 255);
    // p.textSize(20);
    // p.text(l1norm(xConst, yConst) - l1norm(xConst2, yConst2), 0 - 130, 0 - 300);
    // p.pop();
    lorenz.push(p.createVector(x, y));
    lorenz2.push(p.createVector(x2, y2));

    // const speed = 0.2;
    // const wave1 = p.sin(angle * 0.2) * 20;
    // angle += speed;
    // p.push();
    // p.translate(wave1 * 0.5, 0);
    p.beginShape();
    for (const vec of lorenz) {
      p.curveVertex(vec.x * scale, vec.y * scale, 0);
    }
    p.endShape();
    // p.pop();

    // p.push();
    // p.translate(wave1, 0);
    p.stroke(common.accentColor);
    p.beginShape();
    for (const vec2 of lorenz2) {
      p.curveVertex(vec2.x * scale, vec2.y * scale, 0);
    }
    p.endShape();
    // p.pop();


    // const outlineSize: any = common.style.getPropertyValue("--border-size");
    console.log(common.outlineSize);
  };
};

const canvas = document.getElementById("id-canvas-wrapper"); // }}}
new p5(sketch, canvas!);
