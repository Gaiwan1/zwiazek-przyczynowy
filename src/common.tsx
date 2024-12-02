import p5, { Vector } from "p5";

export const outlineSize: number = 2.5;
export const style: CSSStyleDeclaration = getComputedStyle(document.body);
export const mainColor: string = style.getPropertyValue("--clr-main");
export const backgroundColor: string = style.getPropertyValue("--clr-background");
export const accentColor: string = style.getPropertyValue("--clr-accent");

export const baseWidth: number = 700;
export const baseHeight: number = 1000;
export const aspectRatio: number = baseWidth / baseHeight;
export let scaleFactor: number = 1;

export function updateCanvasDimensions(p: p5): any {
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

export function sharedSetup(p: p5): void {
  const { canvasWidth, canvasHeight } = updateCanvasDimensions(p);
  scaleFactor = (baseWidth + baseHeight) / (canvasWidth + baseHeight);
  p.pixelDensity(window.devicePixelRatio);
  p.setAttributes("alpha", false);
  p.setAttributes("antialias", true);
  p.smooth();
  p.createCanvas(canvasWidth, canvasHeight);
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
