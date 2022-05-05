let costumeSketch = function (p) {
  let leftFeather;
  let rightFeather;

  p.preload = function () {
    rightFeather = p.createImg("/images/feather1.png");
    leftFeather = p.createImg("/images/feather2.png");
  };

  let video;
  let poseNet;
  let pose;
  let skeleton;
  let vid;
  const WIDTH = window.innerWidth * (5 / 8);
  const HEIGHT = window.innerHeight * (5 / 8) * 1.33;

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
    p.strokeWeight(0);
    p.stroke(51);

    if (pose) {
      let eyeR = pose.rightEye;
      let eyeL = pose.leftEye;
      let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      p.push();

      p.image(video, 0, 0, WIDTH, HEIGHT);
      p.colorMode(p.HSL, 255);
      p.fill(0, 255, 100);

      for (let i = 0; i < pose.keypoints.length; i++) {
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

      rightFeather.position(
        pose.leftShoulder.x + 330,
        pose.leftShoulder.y - 50
      );
      leftFeather.position(
        pose.rightShoulder.x + 120,
        pose.rightShoulder.y - 10
      );

      p.noStroke();
      p.pop();
    }
  };
};

let costumeP5 = new p5(costumeSketch);
