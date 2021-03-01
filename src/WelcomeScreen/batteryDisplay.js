import React from 'react';

const batteryDisplay = (p) => {
  let cx, cy;
  let red = 0, green = 190, blue = 10;
  let batteryLevel = p.color(red, green, blue);
  let angle = 0;


  p.setup = function () {
    p.createCanvas(850, 850);
    p.stroke(0);
    p.angleMode(p.DEGREES);
    cx = p.width / 2;
    cy = p.height / 2;
  };

  p.keyPressed = function () {
    if (p.keyCode === p.RIGHT_ARROW) {
      angle += 1;
    }
    else if (p.keyCode === p.LEFT_ARROW) {
      angle -= 1;
    }
  };

  p.draw = function () {
    p.fill(0);
    p.translate(cx, cy); // move to center of screen

    p.stroke(255, 75, 0);
    p.strokeWeight(10);
    p.arc(0, 0, cx + (cx * 0.8), cy + (cy * 0.8), 0, 360);

    p.push();
    p.rotate(angle);
    p.stroke(255, 75, 0);
    p.strokeWeight(5);
    p.line(0, 0, cx - (cx / 3), cy - (cy / 2)); // x1 , y1, x2, y2
    p.pop();

    p.push();
    p.rotate(180);
    p.noStroke();
    p.fill(255); // cable / potentiometer (white area)
    p.ellipse(0, 0, cx - (cx / 2), cy - (cy / 2)); // circle
    p.rect(0 - (cx / 16), 0 - (cy / 15), (cx / 8), cy + (cy / 8)); //rect
    p.pop();

    //angle += 1;
  };
};

export default batteryDisplay;