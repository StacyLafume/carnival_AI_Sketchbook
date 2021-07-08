let leftAttractedShapesSketch = function (p) {
    let video;
    let poseNet;
    let poseNet1;
    let pose;
    let skeleton;
    let attractor;
    let dot;
    let vid
    let hue = 0;
     p.interval = 2;
    const WIDTH = window.innerWidth/3
    const HEIGHT = window.innerHeight/3
    let attractorsArray = [];
    const particleArray = [];
    let cloudArray = [];





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
        //vid.size(WIDTH, HEIGHT);
        
        video = p.createCapture(p.VIDEO);
        video.size(WIDTH, HEIGHT);
        video.hide();
        poseNet = ml5.poseNet(video, modelLoaded);
        //poseNet1 = ml5.poseNet(vid, modelLoaded);
        poseNet.on("pose", gotPoses);
        //poseNet1.on("pose", gotPoses);

    }

    p.setup = function () {

        let leftCanvas = p.createCanvas(WIDTH, HEIGHT);
        leftCanvas.parent('leftCanvas');
       // p.createCanvas(WIDTH, HEIGHT);
        //vid = createVideo('valenciasDanceMoves/waverag.MOV',
        // vidLoad
        //z);
        resetSketch()

        let resetButton = p.createButton("reset")
        resetButton.mousePressed(resetSketch)
        slider = p.createSlider(10, 100, 2)
        p.background(50)
    };

    p.draw = function () {
       
       
        
           p.translate(p.width,0);
           p.scale(-1, 1);
           //image(vid, 900, 0, WIDTH,HEIGHT)
           //image(video, 0,0, WIDTH/2, HEIGHT/2)
          p.image(video,0,0, WIDTH, HEIGHT)
           p.colorMode(p.HSL,255)
           p.fill(hue, 255, 100)
 
       
       
       
          
         
    };
};

let leftP5 = new p5(leftAttractedShapesSketch);

let rightAttractedShapesSketch = function (p) {
    let video;
    let poseNet;
    let poseNet1;
    let pose;
    let skeleton;
    let attractor;
    let dot;
    let vid
    let hue = 0;
     p.interval = 2;
    const WIDTH = window.innerWidth/3
    const HEIGHT = window.innerHeight/3
    let attractorsArray = [];
    const particleArray = [];
    let cloudArray = [];

    class Particle {
        constructor(x, y, color) {
            this.pos = p.createVector(x, y);
            this.vel = p.createVector(0, 0);
            this.acc = p.createVector(0, 0);
            this.maxSpeed = 6;
            this.maxForce = .25;
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
            ///p.circle(-this.r, -this.r / 2, Math.random()*60)
            p.triangle(-this.r, -this.r / 4, -this.r, this.r / 4, this.r, 0);
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


    function Cloud(x, y, amount, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.particleArray = new Array(amount);

        for (let i = 0; i < amount; i++) {
            this.particleArray[i] = new Particle(
                this.x + p.random(p.width / 10),
                this.y + p.random(p.height / 10),
                this.color
            );
        }

        this.show = function () {
            console.log(attractorsArray.length);
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].attracted(attractorsArray[i % 4]);
                this.particleArray[i].update();
                this.particleArray[i].show();
            }
        };
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
        //vid.size(WIDTH, HEIGHT);
        cloud = new Cloud(p.random(p.width), p.random(p.height), 1, 100);
        video = p.createCapture(p.VIDEO);
        video.size(WIDTH, HEIGHT);
        video.hide();
        poseNet = ml5.poseNet(video, modelLoaded);
        //poseNet1 = ml5.poseNet(vid, modelLoaded);
        poseNet.on("pose", gotPoses);
        //poseNet1.on("pose", gotPoses);
        cloudArray = []
    }

    p.setup = function () {

        let rightCanvas = p.createCanvas(WIDTH, HEIGHT);
        rightCanvas.parent('rightCanvas');
    
        resetSketch()

        let resetButton = p.createButton("reset")
        resetButton.mousePressed(resetSketch)
        slider = p.createSlider(10, 100, 2)
        p.background(50)
    };

    p.draw = function () {
        p.strokeWeight(0);
        p.stroke(51)
       
         if (pose) {
           let eyeR = pose.rightEye;
           let eyeL = pose.leftEye;
           let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
           p.push();
           p.translate(p.width,0);
           p.scale(-1, 1);
           //image(vid, 900, 0, WIDTH,HEIGHT)
           //image(video, 0,0, WIDTH/2, HEIGHT/2)
          //p.image(video,0,0, WIDTH, HEIGHT)
           p.colorMode(p.HSL,255)
           p.fill(hue, 255, 100)
           //ellipse(pose.nose.x, pose.nose.y, d);
           //fill(0, 0, 255);
           // ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
           // ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
       
           attractorsArray = [];
       
           attractorsArray.push(p.createVector(pose.rightWrist.x, pose.rightWrist.y));
           attractorsArray.push(p.createVector(pose.leftWrist.x, pose.leftWrist.y));
           // attractorsArray.push(createVector(pose.rightHip.x, pose.rightHip.y));
           // attractorsArray.push(createVector(pose.leftHip.x, pose.leftHip.y));
       
           for (let i = 0; i < pose.keypoints.length; i++) {
             let x = pose.keypoints[i].position.x;
             let y = pose.keypoints[i].position.y;
             p.colorMode(p.HSL, 255);
             p.fill(99, 255, 50);
             //ellipse(x, y, 6, 2);
           }
       
           for (let i = 0; i < skeleton.length; i++) {
             let a = skeleton[i][0];
             let b = skeleton[i][1];
             p.strokeWeight(1);
             p.colorMode(p.HSL, 255);
             p.stroke(51);
           
             p.line(a.position.x, a.position.y, b.position.x, b.position.y);
           }
       
           if (p.frameCount % (p.interval * 60) === 0) {
             //particleArray.push(new Particle(random(width), random(height), hue));
             // add a new cloud every four sec
             cloudArray.push(new Cloud(p.random(p.width), p.random(p.height), 2, hue));
           }
           for (let i = 0; i < cloudArray.length; i++) {
             cloudArray[i].show();
           }
           hue > 255 ? (hue = 0) : hue++;
           p.noStroke();
           p.pop();
         }
    };
};

let rightP5 = new p5(rightAttractedShapesSketch);