import p5, { Vector } from "p5";

export const style: CSSStyleDeclaration = getComputedStyle(document.body);
export const outlineSize: number = parseFloat(style.getPropertyValue("--border-size")) * 0.7;
// export const outlineSize: number = 2.5;
export const mainColor: string = style.getPropertyValue("--clr-main");
export const backgroundColor: string =
  style.getPropertyValue("--clr-background");
export const accentColor: string = style.getPropertyValue("--clr-accent");

export const baseWidth: number = 700;
export const baseHeight: number = 1000;
export const aspectRatio: number = baseWidth / baseHeight;
export let scaleFactor: number = 1;

export type Dimensions = {
  width: number;
  height: number;
};

export function updateCanvasDimensions(p: p5): Dimensions {
  const canvasWrapper = document.getElementById("id-canvas-wrapper");
  if (canvasWrapper !== null) {
    const canvasDimensions = canvasWrapper.getBoundingClientRect();
    return {
      width: canvasDimensions.width,
      height: canvasDimensions.height,
    };
  } else {
    return { width: p.windowHeight, height: p.windowHeight };
  }
  // if (p.windowWidth / p.windowHeight > aspectRatio) {
  //   return {
  //     canvasWidth: p.windowHeight * aspectRatio,
  //     canvasHeight: p.windowHeight,
  //   };
  // } else
  //   return {
  //     canvasWidth: p.windowWidth,
  //     canvasHeight: p.windowWidth / aspectRatio,
  //   };
}

export function sharedSetup(p: p5): void {
  const { width, height } = updateCanvasDimensions(p);
  // scaleFactor = 0.001 * (width + height);
  scaleFactor = 1 / ((baseWidth + baseHeight) / (width + height));
  p.pixelDensity(window.devicePixelRatio);
  p.setAttributes("alpha", false);
  p.setAttributes("antialias", true);
  p.smooth();
  p.createCanvas(width, height);
  p.colorMode(p.HSB, 100);
  p.frameRate(60);
}

export function sharedDraw(p: p5): void {
  p.background(backgroundColor);
  p.strokeWeight(outlineSize);
  p.fill(0, 0, 0, 0);
  p.stroke(mainColor);
}

export const slib = (p: p5) => {};
