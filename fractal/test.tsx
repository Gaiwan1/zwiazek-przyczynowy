import "./index.css";
import * as common from "../common.tsx";
import p5 from "p5";

let recursions_slider: any;
let mappingRange: number;
let shaderProgram: p5.Shader;

const sketch = (p: p5) => {
  const vertShader = `
    precision highp float;
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;

    void main() {
      vec4 positionVec4 = vec4(aPosition, 1.0);
      positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
      gl_Position = positionVec4;
      
      // Flip horizontally by negating the x coordinate
      vTexCoord = vec2(1.0 - aTexCoord.x, aTexCoord.y);
    }
  `;

  const fragShader = `
    precision highp float;
    varying vec2 vTexCoord;
    uniform float uRange;
    #define MAX_ITERATIONS 10
    #define TOLERANCE 0.000001

    vec2 complex_mul(vec2 a, vec2 b) {
      return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
    }

    vec2 complex_div(vec2 a, vec2 b) {
      float denom = b.x * b.x + b.y * b.y;
      return vec2(
        (a.x * b.x + a.y * b.y) / denom,
        (a.y * b.x - a.x * b.y) / denom
      );
    }

    vec2 complex_pow3(vec2 z) {
      float a = z.x;
      float b = z.y;
      return vec2(
        a * a * a - 3.0 * a * b * b,
        3.0 * a * a * b - b * b * b
      );
    }

    const vec2 root1 = vec2(1.0, 0.0);
    const vec2 root2 = vec2(-0.5, 0.866025404);
    const vec2 root3 = vec2(-0.5, -0.866025404);

    void main() {
      vec2 z = (vTexCoord * 2.0 - 1.0) * uRange;
      int iterations = 0;
      vec2 dz;

      for(int i = 0; i < MAX_ITERATIONS; i++) {
        vec2 z3 = complex_pow3(z);
        vec2 numerator = vec2(z3.x - 1.0, z3.y);
        vec2 z2 = complex_mul(z, z);
        vec2 denominator = 3.0 * z2;
        dz = complex_div(numerator, denominator);
        z = z - dz;
        
        if(length(dz) < TOLERANCE) break;
        iterations++;
      }

      float dist1 = length(z - root1);
      float dist2 = length(z - root2);
      float dist3 = length(z - root3);
      
      vec3 color;
      
      // Use flat colors without gradients
      if(dist1 < dist2 && dist1 < dist3) {
        color = vec3(1.0, 1.0, 1.0); // White
      } else if(dist2 < dist3) {
        color = vec3(0.0, 0.0, 0.0); // Black
      } else {
        color = vec3(1.0, 0.0, 0.165); // rgb(1, 0, 0.165)
      }
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  p.setup = (): void => {
    const canvasSize = Math.min(window.innerWidth, window.innerHeight);
    p.createCanvas(canvasSize, canvasSize, p.WEBGL);
    
    shaderProgram = p.createShader(vertShader, fragShader);
    p.shader(shaderProgram);
    p.noLoop();

    const element = document.getElementById("fillCanvas");
    if (element !== null) {
      element.remove();
    }

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
    mappingRange = parseFloat(recursions_slider.value() as string);
    shaderProgram.setUniform("uRange", mappingRange);
    
    p.noStroke();
    p.rect(-p.width/2, -p.height/2, p.width, p.height);
  };

  p.windowResized = (): void => {
    const canvasSize = Math.min(window.innerWidth, window.innerHeight);
    p.resizeCanvas(canvasSize, canvasSize);
  };
};

const canvas = document.getElementById("id-canvas-wrapper");
new p5(sketch, canvas!);

