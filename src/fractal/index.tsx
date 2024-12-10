import "./index.css";
import * as common from "../common.tsx";

import p5, { Vector } from "p5";
import * as math from "mathjs";

const sketch = (p: p5) => {
  const pointSize = 10;
  const iterations = 10;
  const mappingRange = 2;
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
    return math.add(math.multiply(x, x), c);
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
    common.sharedSetup(p);
  };

  p.windowResized = (): void => {
    p.setup();
  };

  p.draw = (): void => {
    p.translate(p.width / 2, p.height / 2);
    common.sharedDraw(p);
    p.loadPixels();
    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        // const xMapped = p.map(x, 0, p.width, -mappingRange, mappingRange);
        // const yMapped = p.map(y, 0, p.height, -mappingRange, mappingRange);

        let n = 0;
        let c = math.complex(p.width/10, p.height/10);
        let z = math.complex(0, 0)
        while (n < iterations) {
          const nextZ = mandelbrotPolynomial(z, c);
          if (getMag(z) > 16) {
            break;
          }
          z = nextZ;
          n++;
        }
        const brightness = p.map(n, 0, iterations, 255, 0);
        // const brightness = 0;
        const colorVal = p.color(brightness);
        p.set(x, y, colorVal);
      }
    }
    p.updatePixels();
  };
};

const canvas = document.getElementById("id-canvas-wrapper"); // }}}
new p5(sketch, canvas!);
