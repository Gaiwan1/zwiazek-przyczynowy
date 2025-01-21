import "./index.css";
import * as common from "../common.tsx";

import p5, { Vector } from "p5";
import * as math from "mathjs";

let recursions_slider: any;
let mappingRange: number;

const sketch = (p: p5) => {
  const iterations = 50;
  const cConstant: math.Complex = math.complex(1, 1);

  // Stupid math.js library returns some broken internal type from calculations
  function toComplex(value: math.MathType): math.Complex {
    const complex = value as math.Complex;
    return complex;
  }

  function mandelbrotPolynomial(
    x: math.Complex,
    c: math.Complex,
  ): math.Complex {
    return math.add(toComplex(math.multiply(x, x)), c);
  }

  //
  function mandelbrotP(x: math.Complex): math.Complex {
    // [P]artial
    return mandelbrotPolynomial(x, cConstant);
  }

  function getMag(x: math.Complex): number {
    const complexVector = p.createVector(x.re, x.im);
    return p.createVector(0, 0).dist(complexVector);
  }

  p.setup = (): void => {
    p.createCanvas(400, 400);
    const element = document.getElementById("fillCanvas");
    if (element !== null) {
      element.remove();
    }
    p.noLoop();
    p.createP()
      .position(20, p.height + 30)
      .html("Scale");
    recursions_slider = p
      .createSlider(0, 30, 5, 0.1)
      .position(20, p.height + 50)
      .size(p.width + 200, 40);
    recursions_slider.changed(p.draw);
  };

  p.draw = (): void => {
    p.loadPixels();
    mappingRange = parseInt(recursions_slider.value() as string);
    console.log(mappingRange);
    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        const xMapped = p.map(x, 0, p.width, -mappingRange, mappingRange);
        const yMapped = p.map(y, 0, p.height, -mappingRange, mappingRange);

        let n = 0;
        let c = math.complex(xMapped, yMapped);
        let z = math.complex(0, 0);
        while (n < iterations) {
          const nextZ = mandelbrotPolynomial(z, c);
          if (getMag(z) > 16) {
            break;
          }
          z = nextZ;
          n++;
        }
        const brightness = p.map(n, 0, iterations, 255, 0);
        const colorVal = p.color(brightness);
        p.set(x, y, colorVal);
      }
    }
    p.updatePixels();
  };
};

const canvas = document.getElementById("id-canvas-wrapper"); // }}}
new p5(sketch, canvas!);
