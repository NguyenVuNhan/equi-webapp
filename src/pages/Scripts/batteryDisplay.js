const batteryDisplay = (p) => {
  let cx, cy;
  let batteryLevel = 0;
  let color;
  let yvalues;
  let yoff = 0.0; // 2nd dimension of perlin noise

  p.setup = function () {
    p.createCanvas(1080, 1080);
    p.stroke(0);
    p.angleMode(p.DEGREES);
    cx = p.width / 2;
    cy = p.height / 2;
    p.frameRate(30);
    yvalues = new Array(50);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.batteryLevel !== null) {
      batteryLevel = p.int(props.batteryLevel);
      console.log(p.int(props.batteryLevel));
    }
  };

  p.keyPressed = function () {
    if (p.keyCode === p.RIGHT_ARROW) {
      batteryLevel += 10;
    } else if (p.keyCode === p.LEFT_ARROW) {
      batteryLevel -= 10;
    } else if (p.keyCode === p.UP_ARROW) {
      console.log("x:" + p.mouseX);
      console.log("y:" + p.mouseY);
    }
  };

  p.draw = function () {
    let hour = p.hour();
    let minute = p.minute();
    let hrAngle = p.map(hour % 12, 0, 12, 0, 360);
    let minAngle = p.map(minute, 0, 60, 0, 360);

    EnergyColor(batteryLevel);

    p.push();
    p.fill(0);
    p.stroke(color); // circle
    p.strokeWeight(15);
    p.arc(cx, cy, 900, 900, 0, 360);
    p.pop();

    EnergyLevels(batteryLevel, color);

    p.push();
    p.translate(cx, cy); // move to center of screen
    p.rotate(180);
    p.noStroke();
    p.fill(255, 255, 255); // cable / potentiometer (white area)
    p.ellipse(0, 0, 250, 250); // circle
    p.rect(-40, 0, 80, 640); //rectangle
    p.pop();

    Minutes(minAngle);
    Hours(hrAngle);
  };

  function Minutes(minAngle) {
    p.push();
    p.translate(cx, cy); // move to center of screen
    p.stroke(125, 125, 125);
    p.strokeWeight(7);
    p.rotate(minAngle - 90);
    p.line(0, 0, 400, 0);
    p.pop();
  }

  function Hours(hrAngle) {
    p.push();
    p.translate(cx, cy); // move to center of screen
    p.stroke(125, 125, 125);
    p.strokeWeight(10);
    p.rotate(hrAngle - 90);
    p.line(0, 0, 250, 0);
    p.pop();
  }

  function MakeWaveLine(x1, x2, y) {
    p.push();
    p.noStroke();
    p.beginShape();
    let xoff = 1; // Option #1: 2D Noise
    // Iterate over horizontal pixels
    for (let x = x1; x <= x2; x += 5) {
      // Calculate a y value according to noise, map to

      // Option #1: 2D Noise
      let newY = p.map(p.noise(xoff, yoff), 0, 1, y - 30, y + 25);

      p.vertex(x, newY);
      xoff += 0.03; // Increment x dimension for noise
    }
    yoff += 0.03; // Increment y dimension for noise
    p.vertex(x2 + 10, y);
    p.vertex(x1 - 10, y);
    p.endShape(p.CLOSE);
    p.pop();
  }

  function EnergyLevels(energy, color) {
    if (energy === 0) {
    } else if (energy <= 10 && energy > 0) {
      p.stroke(color);
      p.fill(color);
      p.beginShape();
      p.curveVertex(320, 940);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(600, 981);
      p.curveVertex(655, 971);
      p.curveVertex(708, 940);
      p.endShape(p.CLOSE);
      MakeWaveLine(343, 730, 940);
    } else if (energy <= 20 && energy > 10) {
      p.stroke(color);
      p.fill(color);
      p.beginShape();
      p.curveVertex(205, 840);
      p.curveVertex(312, 930);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(600, 981);
      p.curveVertex(670, 971);
      p.curveVertex(760, 930);
      p.curveVertex(865, 840);
      p.curveVertex(760, 840);
      p.endShape(p.CLOSE);
      MakeWaveLine(210, 870, 840);
    } else if (energy <= 30 && energy > 20) {
      p.stroke(color);
      p.fill(color);
      p.beginShape();
      p.curveVertex(140, 740);
      p.curveVertex(205, 840);
      p.curveVertex(312, 930);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(595, 981);
      p.curveVertex(670, 965);
      p.curveVertex(755, 930);
      p.curveVertex(835, 875);
      p.curveVertex(945, 740);
      p.curveVertex(850, 740);
      p.endShape(p.CLOSE);
      MakeWaveLine(140, 945, 740);
    } else if (energy <= 40 && energy > 30) {
      p.stroke(color);
      p.fill(color);
      p.beginShape();
      p.curveVertex(105, 640);
      p.curveVertex(140, 740);
      p.curveVertex(205, 840);
      p.curveVertex(312, 930);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(595, 981);
      p.curveVertex(670, 965);
      p.curveVertex(755, 930);
      p.curveVertex(835, 875);
      p.curveVertex(870, 840);
      p.curveVertex(903, 810);
      p.curveVertex(969, 640);
      p.curveVertex(870, 640);
      p.endShape(p.CLOSE);
      MakeWaveLine(105, 975, 640);
    } else if (energy <= 50 && energy > 40) {
      p.stroke(color);
      p.fill(color);
      p.beginShape();
      p.curveVertex(95, 540);
      p.curveVertex(105, 640);
      p.curveVertex(140, 740);
      p.curveVertex(205, 840);
      p.curveVertex(312, 930);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(595, 981);
      p.curveVertex(670, 965);
      p.curveVertex(755, 930);
      p.curveVertex(835, 875);
      p.curveVertex(870, 840);
      p.curveVertex(903, 800);
      p.curveVertex(940, 735);
      p.curveVertex(973, 638);
      p.curveVertex(980, 540);
      p.curveVertex(900, 540);
      p.endShape(p.CLOSE);
      MakeWaveLine(95, 980, 540);
    } else if (energy <= 60 && energy > 50) {
      p.stroke(color);
      p.fill(color);
      p.beginShape();
      p.curveVertex(105, 440);
      p.curveVertex(95, 540);
      p.curveVertex(105, 640);
      p.curveVertex(140, 740);
      p.curveVertex(205, 840);
      p.curveVertex(312, 930);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(595, 981);
      p.curveVertex(670, 965);
      p.curveVertex(755, 930);
      p.curveVertex(835, 875);
      p.curveVertex(870, 840);
      p.curveVertex(903, 800);
      p.curveVertex(940, 735);
      p.curveVertex(977, 640);
      p.curveVertex(990, 540);
      p.curveVertex(970, 426);
      p.curveVertex(880, 440);
      p.endShape(p.CLOSE);
      MakeWaveLine(105, 975, 440);
    } else if (energy <= 70 && energy > 60) {
      p.stroke(color);
      p.fill(color);
      p.beginShape();
      p.curveVertex(140, 340);
      p.curveVertex(105, 440);
      p.curveVertex(95, 540);
      p.curveVertex(105, 640);
      p.curveVertex(140, 740);
      p.curveVertex(205, 840);
      p.curveVertex(312, 930);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(595, 981);
      p.curveVertex(670, 965);
      p.curveVertex(755, 930);
      p.curveVertex(835, 875);
      p.curveVertex(870, 840);
      p.curveVertex(903, 800);
      p.curveVertex(940, 735);
      p.curveVertex(977, 640);
      p.curveVertex(990, 540);
      p.curveVertex(970, 426);
      p.curveVertex(940, 340);
      p.curveVertex(850, 340);
      p.endShape(p.CLOSE);
      MakeWaveLine(140, 940, 340);
    } else if (energy <= 80 && energy > 70) {
      p.stroke(color);
      p.fill(color);
      p.beginShape();
      p.curveVertex(205, 240);
      p.curveVertex(140, 340);
      p.curveVertex(105, 440);
      p.curveVertex(95, 540);
      p.curveVertex(105, 640);
      p.curveVertex(140, 740);
      p.curveVertex(205, 840);
      p.curveVertex(312, 930);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(595, 981);
      p.curveVertex(670, 965);
      p.curveVertex(755, 930);
      p.curveVertex(835, 875);
      p.curveVertex(870, 840);
      p.curveVertex(903, 800);
      p.curveVertex(940, 735);
      p.curveVertex(977, 640);
      p.curveVertex(990, 540);
      p.curveVertex(970, 426);
      p.curveVertex(940, 340);
      p.curveVertex(870, 240);
      p.curveVertex(800, 240);
      p.endShape(p.CLOSE);
      MakeWaveLine(210, 870, 240);
    } else if (energy <= 90 && energy > 80) {
      p.stroke(color);
      p.fill(color);
      p.beginShape();
      p.curveVertex(330, 140);
      p.curveVertex(205, 240);
      p.curveVertex(140, 340);
      p.curveVertex(105, 440);
      p.curveVertex(95, 540);
      p.curveVertex(105, 640);
      p.curveVertex(140, 740);
      p.curveVertex(205, 840);
      p.curveVertex(312, 930);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(595, 981);
      p.curveVertex(670, 965);
      p.curveVertex(755, 930);
      p.curveVertex(835, 875);
      p.curveVertex(870, 840);
      p.curveVertex(903, 800);
      p.curveVertex(940, 735);
      p.curveVertex(977, 640);
      p.curveVertex(990, 540);
      p.curveVertex(970, 426);
      p.curveVertex(940, 340);
      p.curveVertex(870, 240);
      p.curveVertex(745, 140);
      p.curveVertex(535, 140);
      p.endShape(p.CLOSE);
      MakeWaveLine(345, 745, 140);
    } else if (energy <= 100) {
      p.fill(color);
      p.noStroke();
      p.beginShape();
      p.curveVertex(330, 140);
      p.curveVertex(205, 240);
      p.curveVertex(140, 340);
      p.curveVertex(105, 440);
      p.curveVertex(95, 540);
      p.curveVertex(105, 640);
      p.curveVertex(140, 740);
      p.curveVertex(205, 840);
      p.curveVertex(312, 930);
      p.curveVertex(420, 971);
      p.curveVertex(460, 981);
      p.curveVertex(540, 986);
      p.curveVertex(595, 981);
      p.curveVertex(670, 965);
      p.curveVertex(755, 930);
      p.curveVertex(835, 875);
      p.curveVertex(870, 840);
      p.curveVertex(903, 800);
      p.curveVertex(940, 735);
      p.curveVertex(977, 640);
      p.curveVertex(990, 540);
      p.curveVertex(970, 426);
      p.curveVertex(940, 340);
      p.curveVertex(870, 240);
      p.curveVertex(745, 140);
      p.curveVertex(532, 88);
      p.endShape(p.CLOSE);
    }
  }

  function EnergyColor(energy) {
    if (energy === 100) {
      color = p.color(0, 255, 0);
    } else if (energy > 90 && energy < 100) {
      color = p.color(50, 255, 0);
    } else if (energy <= 90 && energy > 80) {
      color = p.color(75, 255, 0);
    } else if (energy <= 80 && energy > 70) {
      color = p.color(100, 255, 0);
    } else if (energy <= 70 && energy > 60) {
      color = p.color(125, 255, 0);
    } else if (energy <= 60 && energy > 50) {
      color = p.color(150, 255, 0);
    } else if (energy <= 50 && energy > 40) {
      color = p.color(255, 200, 0);
    } else if (energy <= 40 && energy > 30) {
      color = p.color(200, 150, 0);
    } else if (energy <= 30 && energy > 20) {
      color = p.color(200, 125, 0);
    } else if (energy <= 20 && energy > 10) {
      color = p.color(255, 75, 0);
    } else if (energy <= 10 && energy > 0) {
      color = p.color(255, 50, 0);
    } else if (energy === 0) {
      color = p.color(255, 0, 0);
    } else {
    }
  }
};

export default batteryDisplay;
