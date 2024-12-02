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

  // Window
  const baseWidth: number = 700;
  const baseHeight: number = 1000;
  const aspectRatio: number = baseWidth / baseHeight;
  let scaleFactor: number = 1;

  // Blink
  const switchInterval: number = 1000;
  let showingAll: boolean;
  let lastSwitchTime: number = 0;

  // Mandelbrot
  const cConst = p.random(0, 1);

  function mandelbrotPolynomial(x: number, c: number): number {
    return x^2 + c;
  }

  const deltaTime = 0.01;
  let σ: number;
  let ρ: number;
  let β: number;

  let x = 1;
  let y = 1;
  let z = 1;

  let x2 = p.random(0.995, 1.005);
  let y2 = p.random(0.995, 1.005);
  let z2 = p.random(0.995, 1.005);

  let lorenz: p5.Vector[] = [];
  let lorenz2: p5.Vector[] = [];

  function updateCanvasDimensions(): any {
    if (p.windowWidth / p.windowHeight > aspectRatio) {
      return {
        canvasWidth: p.windowHeight * aspectRatio,
        canvasHeight: p.windowHeight,
      };
    } else
      return {
        canvasWidth: p.windowWidth,
        canvasHeight: p.windowWidth / aspectRatio,
      };
  }

  p.setup = (): void => {
    const { canvasWidth, canvasHeight } = updateCanvasDimensions();
    scaleFactor = (baseWidth + baseHeight) / (canvasWidth + baseHeight);
    p.pixelDensity(window.devicePixelRatio);
    p.setAttributes("alpha", false);
    p.setAttributes("antialias", true);
    p.smooth();
    p.createCanvas(canvasWidth, canvasHeight);
    p.colorMode(p.HSB, 100);
    p.frameRate(60);

    σ = 10;
    ρ = 28;
    β = 8.0 / 3;
  }; // }}}

  p.windowResized = (): void => {
    p.setup();
  };

  p.draw = (): void => {
    p.strokeWeight(outlineSize);
    p.fill(0, 0, 0, 0);
    p.stroke(mainColor);
    p.strokeWeight(0.2);
    p.background(backgroundColor);

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
  };
};

const canvas = document.getElementById("id-canvas-wrapper"); // }}}
new p5(sketch, canvas!);

