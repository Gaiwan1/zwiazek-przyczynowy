import "./index.css";
import * as common from "../common.tsx";

import p5, { Vector } from "p5";
import * as math from "mathjs";

const sketch = (p: p5) => {
  const pointSize = 10;
  const iterations = 100;
  const cConstant: math.Complex = math.complex(1, 1);

  // Mandelbrot
  function mandelbrotPolynomial(x: math.Complex, c: math.Complex) {
    return math.add(math.pow(x, 2), c);
  }

  function mandelbrotP(x: math.Complex) {
    // [P]artial
    return mandelbrotPolynomial(x, cConstant);
  }

  p.setup = (): void => {
    common.sharedSetup(p);
    // let a = map(x, 0, width, -aspect_ratio * mapping_range, aspect_ratio * mapping_range); // map(original value, original range1, original range2, final range1, final range2)
    // let b = map(y, 0, height, -mapping_range, mapping_range);
  };

  p.windowResized = (): void => {
    p.setup();
  };

  p.draw = (): void => {
    common.sharedDraw(p);
    let seed = math.complex(p.mouseX, p.mouseY);
    p.fill(255);
    p.circle(seed.re, seed.im, pointSize);
    const seed2 = mandelbrotP(seed);
    // console.log(seed)
    console.log(seed2);
    // p.circle(math.re(seed), math.im(seed), pointSize)
  };
};

const canvas = document.getElementById("id-canvas-wrapper"); // }}}
new p5(sketch, canvas!);
