let movementPainting1 = function (p) {
  let video;
  let poseNet;
  let pose;
  let skeleton;
  let hue = 0;
  p.interval = 2;
  const WIDTH = window.innerWidth * (3.5 / 8);
  const HEIGHT = window.innerHeight * (3.5 / 8) * 1.33;

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
    video = p.createCapture(p.VIDEO);
    video.size(WIDTH, HEIGHT);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
  }

  p.setup = function () {
    let leftCanvas = p.createCanvas(WIDTH, HEIGHT);
    leftCanvas.parent("leftCanvas");
    resetSketch();
    p.background(50);
  };

  p.draw = function () {
    p.translate(p.width, 0);
    p.scale(-1, 1);
    p.image(video, 0, 0, WIDTH, HEIGHT);
    p.colorMode(p.HSL, 255);
    p.fill(hue, 255, 100);
    if (pose) {
      for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        p.strokeWeight(3);
        p.colorMode(p.HSL, 255);
        p.stroke(255);

        p.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
    }
  };
};

let leftP5 = new p5(movementPainting1);

let movementPainting2 = function (p) {
  let video;
  let poseNet;
  let pose;
  let hue = 0;
  let clearButton;
  let saveButton;
  p.interval = 2;
  const WIDTH = window.innerWidth * (3.5 / 8);
  const HEIGHT = window.innerHeight * (3.5 / 8) * 1.33;
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
    this.amount = 2;
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
    this.wrists = false;
  }
  function Shoulders() {
    this.shoulders = false;
  }
  function Head() {
    this.head = true;
  }
  function Knees() {
    this.knees = false;
  }
  function Ankles() {
    this.ankles = false;
  }

  function labelControl(controller, label, className) {
    controller.name(label);
    const input = controller.domElement.querySelector("input");
    if (input) input.setAttribute("aria-label", label);
    if (className) controller.domElement.closest("li.cr").classList.add(className);
  }

  function makeFolderAccessible(folder, label) {
    folder.domElement.setAttribute("role", "group");
    folder.domElement.setAttribute("aria-label", label);
    const title = folder.domElement.querySelector(".title");
    title.setAttribute("role", "button");
    title.setAttribute("tabindex", "0");
    title.setAttribute("aria-expanded", "true");
    title.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        title.click();
      }
    });
    title.addEventListener("click", () => {
      title.setAttribute("aria-expanded", String(!folder.closed));
    });
  }

  function makeGuiAccessible(gui) {
    gui.domElement.setAttribute("role", "group");
    gui.domElement.setAttribute("aria-label", "Artwork settings");
    const closeButton = gui.domElement.querySelector(".close-button");
    closeButton.setAttribute("role", "button");
    closeButton.setAttribute("tabindex", "0");
    closeButton.setAttribute("aria-expanded", "true");
    closeButton.setAttribute("aria-label", "Close artwork settings");
    closeButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        closeButton.click();
      }
    });
    closeButton.addEventListener("click", () => {
      closeButton.setAttribute("aria-expanded", String(!gui.closed));
      closeButton.setAttribute(
        "aria-label",
        gui.closed ? "Open artwork settings" : "Close artwork settings"
      );
    });
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
  labelControl(settings.add(size, "size", 1, 10), "Particle size");
  labelControl(settings.add(howMany, "amount", 1, 100), "Number of shapes");
  settings.open();
  makeFolderAccessible(settings, "Settings");

  const shapes = gui.addFolder("Shapes");
  labelControl(shapes.add(triangle, "triangle"), "Show triangles");
  labelControl(shapes.add(circle, "circle"), "Show circles");
  shapes.open();
  makeFolderAccessible(shapes, "Shapes");

  const bodyParts = gui.addFolder("Draw Body Parts");
  labelControl(bodyParts.add(shoulders, "shoulders"), "Shoulders");
  labelControl(bodyParts.add(hips, "hips"), "Hips");
  labelControl(bodyParts.add(wrists, "wrists"), "Wrists");
  labelControl(bodyParts.add(head, "head"), "Head");
  labelControl(bodyParts.add(knees, "knees"), "Knees");
  labelControl(bodyParts.add(ankles, "ankles"), "Ankles");
  bodyParts.open();
  makeFolderAccessible(bodyParts, "Draw body parts");

  const color = gui.addFolder("Colors");
  labelControl(color.add(colors, "red"), "Use red", "color-red");
  labelControl(color.add(colors, "orange"), "Use orange", "color-orange");
  labelControl(color.add(colors, "yellow"), "Use yellow", "color-yellow");
  labelControl(color.add(colors, "green"), "Use green", "color-green");
  labelControl(color.add(colors, "blue"), "Use blue", "color-blue");
  labelControl(color.add(colors, "purple"), "Use purple", "color-purple");
  labelControl(color.add(colors, "random"), "Use random colors");
  color.open();
  makeGuiAccessible(gui);
  makeFolderAccessible(color, "Colors");

  class Particle {
    constructor(x, y, color) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.maxSpeed = 6;
      this.maxForce = 0.25;
      this.r = 8;
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
      circle.circle ? p.circle(-this.r, -this.r / 2, 10 * size.size) : null;
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
    video = p.createCapture(p.VIDEO);
    video.size(WIDTH, HEIGHT);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
  }

  p.setup = function () {
    let rightCanvas = p.createCanvas(WIDTH, HEIGHT);
    rightCanvas.parent("rightCanvas");

    resetSketch();
    p.background(255);
    clearButton = p.createButton("Clear canvas");
    clearButton.mousePressed(clearCanvas);
    clearButton.addClass("app2");
    clearButton.attribute("aria-label", "Clear the painting canvas");
    saveButton = p.createButton("Save artwork");
    saveButton.mousePressed(save);
    saveButton.addClass("app2");
    saveButton.attribute("aria-label", "Save artwork as an image");
  };

  function clearCanvas() {
    p.background(255, 255, 255);
  }
  
  function save() {
    p.save("myArt.png");
  }

  p.draw = function () {
    let int = Math.ceil(howMany.amount);

    if (pose) {
      let eyeR = pose.rightEye;
      let eyeL = pose.leftEye;
      let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      p.push();
      p.translate(p.width, 0);
      p.scale(-1, 1);

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

let rightP5 = new p5(movementPainting2);
