import energyIcon from '../../custom-icons/EnergyIcon.svg';
import scheduleIcon from '../../custom-icons/SchedulingIcon.svg';
import devicesIcon from '../../custom-icons/AppliancesIcon.svg';
import xIcon from '../../custom-icons/Union.svg';


const menu = (p) => {
    let cx, cy;
    let angle = -125;
    let energy, devices, schedule, cancel;

    p.setup = function () {
      p.createCanvas(1080, 1080);
      p.stroke(0);
      p.angleMode(p.DEGREES);
      cx = p.width / 2;
      cy = p.height / 2;
      energy = p.loadImage(energyIcon);
      devices = p.loadImage(devicesIcon);
      schedule = p.loadImage(scheduleIcon);
      cancel =  p.loadImage(xIcon);
      };
  
    p.keyPressed = function () {
      if (p.keyCode === p.RIGHT_ARROW) 
      {
        angle += 5;
        if(angle >= 215)
        { 
          angle = -125;
        }
      }
      else if (p.keyCode === p.LEFT_ARROW) 
      {
        angle -= 5;
        if(angle <= -125)
        { 
          angle = 215;
        }
      }
      else if (p.keyCode === p.UP_ARROW)
      {
        console.log('angle:' + angle);
        console.log('x:' + p.mouseX);
        console.log('y:' + p.mouseY);
      }
      else if(p.keyCode === p.ENTER)
      {
        if(angle >= -105 &&  angle <= -70)
        {
          console.log('exit pressed');
        }
        else if(angle <= 200 &&  angle >= 160)
        {
          console.log('energy pressed');
        }
        else if(angle >= -30 &&  angle <= 10)
        {
          console.log('appliances pressed');
        }
        else if(angle <= 120 &&  angle >= 80)
        {
          console.log('schedule pressed');
        }
      }
    };
  
    p.draw = function () {
      p.push();
      p.fill(0);
      p.stroke(150, 150, 150); // circle
      p.strokeWeight(15);
      p.arc(cx, cy, 900, 900, 0, 360);
      p.pop();
     
      p.push();
      p.noFill();
      p.translate(cx, cy); // move to center of screen
      p.stroke(150,150,150);
      p.strokeWeight(25);
      p.ellipse(0,0,550,550);
      p.pop();
      
      selectionMenu();
      dial();
      
      p.push(); 
      p.translate(cx, cy); // move to center of screen
      p.rotate(180);
      p.noStroke();
      p.fill(255, 255, 255); // cable / potentiometer (white area)
      p.ellipse(0, 0, 250, 250); // circle
      p.rect(-40, 0, 80, 640); //rectangle
      p.pop();
    };

    // dial / cursor
    function dial(){
      p.push(); 
      p.translate(cx, cy); // move to center of screen
      p.rotate(angle);
      p.stroke(150, 100, 150);
      p.strokeWeight(5);
      p.line(0, 0, 300, 300); // x1 , y1, x2, y2
      p.pop();
    }

    function selectionMenu(){
      p.push();
      p.stroke(150,150,150);
      p.strokeWeight(10);
      p.fill('rgba(50,50,50,1)'); // top right
      p.ellipse(750,350,200,200);
      p.image(cancel, 700, 295);

      p.fill('rgba(244,230,150,1)'); // top left
      p.ellipse(350,350,200,200);
      p.image(energy, 300, 270); 

      p.fill('rgba(117,199,204,1)'); // bot right
      p.ellipse(770,700,200,200);
      p.image(devices, 705, 625); 

      p.fill('rgba(226,76,58,1)'); // bot left
      p.ellipse(320,700,200,200);
      p.image(schedule, 255, 630); 
      p.pop();
    }
  };
  
  
  export default menu;