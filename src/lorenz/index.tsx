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
  let σ2: number;
  let ρ2: number;
  let β2: number;
  // let x = p.random(-0.5, 0.5);
  // let y = p.random(-0.5, 0.5);
  // let z = p.random(-0.5, 0.5);
  //
  // let x2 = p.random(-0.5, 0.5);
  // let y2 = p.random(-0.5, 0.5);
  // let z2 = p.random(-0.5, 0.5);

  let x = 1;
  let y = 1;
  let z = 1;

  let x2 = 1.00001;
  let y2 = 1;
  let z2 = 1;

  let lorenz: p5.Vector[] = [];
  let lorenz2: p5.Vector[] = [];

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

    σ = 10;
    ρ = 28;
    β = 8.0 / 3;

    σ2 = 10;
    ρ2 = 28;
    β2 = 8.0 / 3;

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

    const dx2 = σ2 * (y2 - x2) * deltaTime;
    const dy2 = (x2 * (ρ2 - z2) - y2) * deltaTime;
    const dz2 = (x2 * y2 - β2 * z2) * deltaTime;

    x = x + dx;
    y = y + dy;
    z = z + dz;

    x2 = x2 + dx2;
    y2 = y2 + dy2;
    z2 = z2 + dz2;
    p.translate(p.width / 2, p.height / 2);
    p.strokeWeight(0.2);
    p.scale(15);

    lorenz.push(p.createVector(x, y));
    lorenz2.push(p.createVector(x2, y2));

    p.fill(0, 0, 0, 0);
    p.beginShape();
    for (const vec of lorenz) {
      p.curveVertex(vec.x, vec.y, 0);
    }
    p.endShape();

    p.stroke(accentColor);
    p.beginShape();
    for (const vec2 of lorenz2) {
      p.curveVertex(vec2.x, vec2.y, 0);
    }
    p.endShape();

    p.strokeWeight(0.2);
    p.fill(backgroundColor);

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
