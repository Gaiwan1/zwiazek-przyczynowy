// Imports {{{
import "./index.css";

import p5, { Vector } from "p5";
import * as math from "mathjs";
//}}}

const sketch = (p: p5) => {
  // Basic Boid {{{
  class Boid {
    constructor(
      public position: p5.Vector,
      public velocity: p5.Vector,
      public acceleration: p5.Vector,
      public color: p5.Color,
      public maxForce: number,
      public maxSpeed: number,
    ) {}
    getPos(): [number, number] {
      return [this.position.x, this.position.y];
    }
  }

  type BoidWithDistance = {
    boid: Boid;
    distance: number;
  };

  function createBoids(amount: number): Boid[] {
    return Array.from({ length: amount }).map(
      (): Boid =>
        new Boid(
          new Vector(math.random(0, p.width), math.random(0, p.height)),
          p5.Vector.random2D().setMag(p.random(0.05, 1)),
          p5.Vector.random2D(),
          p.color(0, 0, 0),
          maxForce,
          maxSpeed,
        ),
    );
  }

  function updateBoid(boid: Boid): Boid {
    return new Boid(
      boid.position.add(boid.velocity),
      boid.velocity.add(boid.acceleration).limit(2),
      boid.acceleration.mult(0),
      boid.color,
      boid.maxForce,
      boid.maxSpeed,
    );
  }

  function updateBoidByRules(boid: Boid, rules: p5.Vector[]): Boid {
    const rulesSum = rules.reduce(
      (accumulator, currentValue) => p5.Vector.add(accumulator, currentValue),
      new Vector(0, 0),
    );
    return new Boid(
      boid.position,
      boid.velocity,
      boid.acceleration.add(rulesSum),
      boid.color,
      boid.maxForce,
      boid.maxSpeed,
    );
  } // }}}

  function BoidsWithDistanceToBoid(
    boid: Boid,
    boids: Boid[],
  ): BoidWithDistance[] {
    return boids
      .filter((boid2): boolean => {
        return boid2 !== boid;
      })
      .map(
        (otherBoid): BoidWithDistance => ({
          boid: otherBoid,
          distance: boid.position.dist(otherBoid.position),
        }),
      );
  }

  function BoidsInRange(
    distancedBoids: BoidWithDistance[],
    range: number,
  ): BoidWithDistance[] {
    return distancedBoids.filter(
      (distancedBoid): boolean => distancedBoid.distance < range,
    );
  }

  function pickRandomBoid(allBoids: Boid[]): number {
    return p.int(p.random(0, allBoids.length));
  }

  function centreOfBoidMass(boids: Boid[]): p5.Vector {
    const posistions = boids.map((boid) => boid.position);
    const posistionsSum = posistions.reduce(
      (accumulator, currentValue) => accumulator.add(currentValue),
      new Vector(0, 0),
    );
    return posistionsSum.div(posistions.length);
  }

  function alignmentVec(boid: Boid, boids: Boid[]): p5.Vector {
    const velocities = BoidsInRange(
      BoidsWithDistanceToBoid(boid, boids),
      boidViewRange * 1,
    ).map((x) => x.boid.velocity);
    const velocitySum = velocities.reduce(
      (accumulator, currentValue) => accumulator.add(currentValue),
      new Vector(0, 0),
    );
    if (velocities.length <= 0) {
      return p.createVector(0, 0);
    }
    return velocitySum
      .div(velocities.length)
      .setMag(boid.maxSpeed)
      .sub(boid.velocity)
      .limit(boid.maxForce);
  }

  function separationVec(boid: Boid, boids: Boid[]): p5.Vector {
    const posistions = BoidsInRange(
      BoidsWithDistanceToBoid(boid, boids),
      boidViewRange * 1.5,
    ).map((x) => x.boid.position);
    const diffSum = posistions
      .map((otherBoidPos) => {
        const distance = boid.position.dist(otherBoidPos);
        return p5.Vector.sub(boid.position, otherBoidPos).div(
          distance * distance,
        );
      })
      .reduce(
        (accumulator, currentValue) => accumulator.add(currentValue),
        new Vector(0, 0),
      );
    if (posistions.length === 0) {
      return p.createVector(0, 0);
    }
    return diffSum
      .div(posistions.length)
      .setMag(boid.maxSpeed)
      .sub(boid.velocity)
      .limit(boid.maxForce);
  }

  function cohesionVec(boid: Boid, boids: Boid[]): p5.Vector {
    const posistions = BoidsInRange(
      BoidsWithDistanceToBoid(boid, boids),
      boidViewRange * 1,
    ).map((x) => x.boid.position);
    const positionSum = posistions.reduce(
      (accumulator, currentValue) => p5.Vector.add(accumulator, currentValue),
      new Vector(0, 0),
    );
    if (posistions.length <= 0) {
      return p.createVector(0, 0);
    }
    return positionSum
      .div(posistions.length)
      .sub(boid.position)
      .setMag(boid.maxSpeed)
      .sub(boid.velocity)
      .limit(boid.maxForce);
  }

  function mouseVec(boid: Boid): p5.Vector {
    return p
      .createVector(p.mouseX, p.mouseY)
      .sub(boid.position)
      .setMag(boid.maxSpeed)
      .sub(boid.velocity)
      .limit(boid.maxForce);
  }

  // function updateCanvasDimensions(): any {
  //   if (p.windowWidth / p.windowHeight > aspectRatio) {
  //     return {
  //       canvasWidth: p.windowHeight * aspectRatio,
  //       canvasHeight: p.windowHeight,
  //     };
  //   } else
  //     return {
  //       canvasWidth: p.windowWidth,
  //       canvasHeight: p.windowWidth / aspectRatio,
  //     };
  // }

  // Settings {{{
  let boids: Boid[];
  const boidViewRange: number = 100;
  const amount: number = 100;
  const maxForce = 999;
  const maxSpeed = 999;
  // Window
  const baseWidth = 1000;
  const baseHeight = 1000;
  const basePadding = 100;
  const boidSize = 20;
  const aspectRatio = baseWidth / baseHeight;
  let scaleFactor = 1;
  let chosenBoidID: number;
  // Style
  const outlineSize = 5;

  // p.windowResized = (): void => {
  //   p.setup();
  // };

  p.setup = (): void => {
    // const { canvasWidth, canvasHeight } = updateCanvasDimensions();
    // scaleFactor = (baseWidth + baseHeight) / (canvasWidth + baseHeight)
    // let padding = basePadding * scaleFactor
    // if (scaleFactor < 1.3) {
    //   padding = basePadding * (scaleFactor * 2)
    // }
    // p.pixelDensity(window.devicePixelRatio);
    p.setAttributes("alpha", false);
    p.createCanvas(700, 1000);
    p.colorMode(p.HSB, 100);
    p.frameRate(60);
    p.strokeWeight(outlineSize);
    boids = createBoids(amount);
    chosenBoidID = pickRandomBoid(boids);
  }; // }}}

  // Impure functions {{{
  function showBoid(boid: Boid, size: number): void {
    p.circle(boid.position.x, boid.position.y, size);
  }

  function vLine(a: p5.Vector, b: p5.Vector): void {
    p.line(a.x, a.y, b.x, b.y);
  }

  function drawLinesToOthers(boid: Boid, others: Boid[]): void {
    const otherBoids = others.filter(
      (maybeOtherBoid) => boid !== maybeOtherBoid,
    );
    otherBoids.map((otherBoid) => vLine(otherBoid.position, boid.position));
  }
  // }}}

  p.draw = (): void => {
    const boidsNew: Boid[] = boids
      .map((boid) =>
        updateBoidByRules(boid, [
          alignmentVec(boid, boids).setMag(1),
          cohesionVec(boid, boids).setMag(1),
          separationVec(boid, boids).setMag(1),
          mouseVec(boid).setMag(0.1),
        ]),
      )
      .map(updateBoid);
    boids = boidsNew;
    const chosenBoid = boids[chosenBoidID];
    const boidsNearChosen: BoidWithDistance[] = BoidsInRange(
      BoidsWithDistanceToBoid(chosenBoid, boids),
      boidViewRange * 1,
    );


    // Draw lines from chosen boid to other boids.
    p.fill(0, 0, 100, 100);
    p.background(255);
    p.strokeWeight(4);
    drawLinesToOthers(
      chosenBoid,
      boidsNearChosen.map((x) => x.boid),
    );
    p.strokeWeight(outlineSize);

    // Show all boids.
    boids.map((boid) => showBoid(boid, boidSize));

    // Show chosen boid.
    p.fill(360, 100, 80, 100);
    p.circle(
      boids[chosenBoidID].position.x,
      boids[chosenBoidID].position.y,
      boidSize,
    );
    p.stroke(360, 100, 0, 100);

    p.fill(30, 100, 50, 50);
    p.ellipse(p.mouseX, p.mouseY, 100, 100);

    p.fill(50, 100, 50, 100);
    p.textSize(20);
  };
};

const canvas = document.getElementById("id-canvas-wrapper"); // }}}
new p5(sketch, canvas!);
