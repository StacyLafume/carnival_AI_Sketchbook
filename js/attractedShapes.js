let AttractedShapesSketch = function (p) {
  let video;
  let poseNet;
  let pose;
  let skeleton;
  let vid;
  let hue = 0;
  p.interval = 2;
  const WIDTH = window.innerWidth * (5 / 8);
  const HEIGHT = window.innerHeight * (5 / 8) * 1.33;
  let attractorsArray = [];
  const particleArray = [];
  let colorIndex = 0;

  function Color() {
    this.red = false;
    this.orange = false;
    this.yellow = false;
    this.green = false;
    this.blue = false;
    this.purple = false;
    this.random = true;
  }

  function Size() {
    this.size = 1;
  }

  function HowMany() {
    this.amount = 1;
  }
  function Triangle() {
    this.triangle = true;
  }
  function Circle() {
    this.circle = false;
  }
  function Hips() {
    this.hips = false;
  }
  function Wrists() {
    this.wrists = true;
  }
  function Shoulders() {
    this.shoulders = false;
  }
  function Head() {
    this.head = false;
  }
  function Knees() {
    this.knees = false;
  }
  function Ankles() {
    this.ankles = false;
  }

  let gui = new dat.GUI();
  let size = new Size();
  let colors = new Color();
  let triangle = new Triangle();
  let circle = new Circle();
  let howMany = new HowMany();
  let hips = new Hips();
  let wrists = new Wrists();
  let shoulders = new Shoulders();
  let head = new Head();
  let knees = new Knees();
  let ankles = new Ankles();

  const settings = gui.addFolder("Settings");
  settings.add(size, "size", 1, 5);
  settings.add(howMany, "amount", 1, 100);
  settings.open();

  const shapes = gui.addFolder("Shapes");
  shapes.add(triangle, "triangle");
  shapes.add(circle, "circle");
  shapes.open();

  const bodyParts = gui.addFolder("Attracted Body Parts");
  bodyParts.add(shoulders, "shoulders");
  bodyParts.add(hips, "hips");
  bodyParts.add(wrists, "wrists");
  bodyParts.add(head, "head");
  bodyParts.add(knees, "knees");
  bodyParts.add(ankles, "ankles");
  bodyParts.open();

  const color = gui.addFolder("Colors");
  color.add(colors, "red");
  color.add(colors, "orange");
  color.add(colors, "yellow");
  color.add(colors, "green");
  color.add(colors, "blue");
  color.add(colors, "purple");
  color.add(colors, "random");
  color.open();

  class Particle {
    constructor(x, y, color) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.maxSpeed = 6;
      this.maxForce = 0.25;
      this.r = 16;
      this.color = color || 0;
    }

    attracted(target) {
      let force = p5.Vector.sub(target, this.pos);
      force.setMag(this.maxSpeed);
      force.sub(this.vel);
      force.limit(this.maxForce);
      this.applyForce(force);
    }

    applyForce(force) {
      this.acc.add(force);
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
    }

    show() {
      p.colorMode(p.HSL, 255);
      p.fill(this.color, 255, 100);
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.vel.heading());
      circle.circle ? p.circle(-this.r, -this.r / 2, size.size * 10) : null;
      triangle.triangle
        ? p.triangle(
            -this.r * size.size,
            (-this.r / 4) * size.size,
            -this.r * size.size,
            (this.r / 4) * size.size,
            this.r * size.size,
            0
          )
        : null;
      p.pop();
    }

    edges() {
      if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
      } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
      }
      if (this.pos.y > height + this.r) {
        this.pos.y = -this.r;
      } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
      }
    }
  }

  function modelLoaded() {
    console.log("poseNet ready");
  }

  function gotPoses(poses) {
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  }

  function resetSketch() {
    vid.size(WIDTH, HEIGHT);
    video = p.createCapture(p.VIDEO);
    video.size(WIDTH, HEIGHT);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
  }

  p.setup = function () {
    let canvas = p.createCanvas(WIDTH, HEIGHT);
    canvas.parent("middle");
    vid = p.createVideo("/videos/adele/slowWine.mp4", vidLoad);
    function vidLoad() {
      vid.loop();
      vid.volume(0);
    }

    resetSketch();

    p.background(50);
  };

  p.draw = function () {
    let int = Math.ceil(howMany.amount);
    p.strokeWeight(0);
    p.stroke(51);

    if (pose) {
      let eyeR = pose.rightEye;
      let eyeL = pose.leftEye;
      let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      p.push();
      p.translate(p.width, 0);
      p.scale(-1, 1);

      p.image(video, 0, 0, WIDTH, HEIGHT);
      p.colorMode(p.HSL, 255);
      p.fill(hue, 255, 100);

      attractorsArray = [];

      hips.hips
        ? attractorsArray.push(p.createVector(pose.rightHip.x, pose.rightHip.y))
        : null;
      hips.hips
        ? attractorsArray.push(p.createVector(pose.leftHip.x, pose.leftHip.y))
        : null;
      wrists.wrists
        ? attractorsArray.push(
            p.createVector(pose.rightWrist.x, pose.rightWrist.y)
          )
        : null;
      wrists.wrists
        ? attractorsArray.push(
            p.createVector(pose.leftWrist.x, pose.leftWrist.y)
          )
        : null;
      shoulders.shoulders
        ? attractorsArray.push(
            p.createVector(pose.leftShoulder.x, pose.leftShoulder.y)
          )
        : null;
      shoulders.shoulders
        ? attractorsArray.push(
            p.createVector(pose.rightShoulder.x, pose.rightShoulder.y)
          )
        : null;
      head.head
        ? attractorsArray.push(p.createVector(pose.leftEar.x, pose.leftEar.y))
        : null;
      head.head
        ? attractorsArray.push(p.createVector(pose.rightEar.x, pose.rightEar.y))
        : null;
      head.head
        ? attractorsArray.push(p.createVector(pose.leftEye.x, pose.leftEye.y))
        : null;
      head.head
        ? attractorsArray.push(p.createVector(pose.rightEye.x, pose.rightEye.y))
        : null;
      head.head
        ? attractorsArray.push(p.createVector(pose.nose.x, pose.nose.y))
        : null;
      knees.knees
        ? attractorsArray.push(p.createVector(pose.leftKnee.x, pose.leftKnee.y))
        : null;
      knees.knees
        ? attractorsArray.push(
            p.createVector(pose.rightKnee.x, pose.rightKnee.y)
          )
        : null;
      ankles.ankles
        ? attractorsArray.push(
            p.createVector(pose.leftAnkle.x, pose.leftAnkle.y)
          )
        : null;
      ankles.ankles
        ? attractorsArray.push(
            p.createVector(pose.rightAnkle.x, pose.rightAnkle.y)
          )
        : null;

      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        p.colorMode(p.HSL, 255);
        p.fill(99, 255, 50);
      }

      for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        p.strokeWeight(1);
        p.colorMode(p.HSL, 255);
        p.stroke(255);

        p.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }

      if (p.frameCount % (p.interval * 60) === 0) {
        const newParticleCount = int - particleArray.length;
        if (newParticleCount < 0) {
          particleArray.splice(0, Math.abs(newParticleCount));
        } else {
          const colorArray = [];
          if (colors.red) {
            colorArray.push(255);
          }
          if (colors.orange) {
            colorArray.push(20);
          }
          if (colors.yellow) {
            colorArray.push(40);
          }
          if (colors.green) {
            colorArray.push(60);
          }
          if (colors.blue) {
            colorArray.push(150);
          }
          if (colors.purple) {
            colorArray.push(200);
          }
          if (colors.random) {
            colorArray.push(hue);
          }
          for (let i = 0; i < newParticleCount; i++) {
            // index will never leave the range the range will be the remainder
            particleArray.push(
              new Particle(
                p.random(p.width),
                p.random(p.height),
                colorArray[colorIndex % colorArray.length] || hue
              )
            );
            colorIndex++;
          }
        }
      }

      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].attracted(attractorsArray[i % attractorsArray.length]);
        particleArray[i].update();
        particleArray[i].show();
      }
      hue > 255 ? (hue = 0) : hue++;
      p.noStroke();
      p.pop();
    }
  };
};

let AttractedP5 = new p5(AttractedShapesSketch);
