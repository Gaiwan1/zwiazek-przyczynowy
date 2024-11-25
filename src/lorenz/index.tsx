import "./index.css";

import p5, { Vector } from "p5";
import * as math from "mathjs";

const sketch = (p: p5) => {
  // Style
  const outlineSize: number = 2.5;
  const style: CSSStyleDeclaration = getComputedStyle(document.body);
  const mainColor: string = style.getPropertyValue("--clr-main");
  const backgroundColor: string = style.getPropertyValue("--clr-background");
  const accentColor: string = style.getPropertyValue("--clr-accent");

  // Blink
  const switchInterval: number = 1000;
  let showingAll: boolean;
  let lastSwitchTime: number = 0;

  // Lorenz
  const deltaTime = 0.01;
  let σ: number;
  let ρ: number;
  let β: number;
  let x = 1;
  let y = 1;
  let z = 1;
  let vectors: p5.Vector[] = [];

  // function lorenzPoints(x: number, y: number, z: number): number[] {
  //   const dx = σ * (y - x) * deltaTime;
  //   const dy = (x * (ρ - z) - y) * deltaTime;
  //   const dz = ( x * y - β * z ) * deltaTime;
  //   return [dx, dy, dz];
  // }

  p.setup = (): void => {
    p.setAttributes("alpha", false);
    p.createCanvas(700, 1000);
    p.colorMode(p.HSB, 100);
    p.frameRate(60);
    p.strokeWeight(outlineSize);
    p.fill(0, 0, 0, 0);
    p.stroke(accentColor);

    σ = p.random(10, 20);
    ρ = p.random(10, 40);
    β = 8.0 / 3;

    // σ = p.random(-100, 10);
    // ρ = p.random(-100, 10);
    // β = p.random(-100, 10) / p.random(-100, 100);
  }; // }}}

  // Impure functions {{{
  function vLine(a: p5.Vector, b: p5.Vector): void {
    p.line(a.x, a.y, b.x, b.y);
  }
  // }}}

  p.draw = (): void => {
    p.stroke(mainColor);
    p.background(backgroundColor);
    const dx = σ * (y - x) * deltaTime;
    const dy = (x * (ρ - z) - y) * deltaTime;
    const dz = (x * y - β * z) * deltaTime;
    x = x + dx;
    y = y + dy;
    z = z + dz;
    p.translate(p.width / 2, p.height / 2);
    p.strokeWeight(0.2);
    p.scale(15);

    // p.point(x, y);
    vectors.push(p.createVector(x, y));

    p.beginShape();
    for (const vec of vectors) {
      // p.curveVertex(vec.x * p.random(p.frameCount* 0.01), vec.y * p.random(p.frameCount * 0.01), 0);
      // p.curveVertex(vec.x + p.random(-p.frameCount * 0.01, p.frameCount * 0.01), vec.y, 0);
      p.curveVertex(vec.x, vec.y, 0);
      // p.point(vec.x, vec.y);
    }
    p.endShape();
    p.stroke(accentColor);
    p.strokeWeight(0.2);
    p.fill(backgroundColor);
    p.circle(x, y, 2);

    // console.log(x, y);
    // console.log(vectors);
    // if (p.millis() - lastSwitchTime >= switchInterval) {
    //   showingAll = !showingAll; // Toggle the state
    //   lastSwitchTime = p.millis(); // Reset the timer
    // }
    //
    // if (!showingAll) {
    //   p.background(backgroundColor);
    // }
  };
};

const canvas = document.getElementById("id-canvas-wrapper"); // }}}
new p5(sketch, canvas!);
