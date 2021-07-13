

let AttractedShapesSketch = function (p) {
   
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
    const WIDTH = window.innerWidth *  (5/8) 
    const HEIGHT = window.innerHeight  * (5/8)  * 1.33
    let attractorsArray = [];
    const particleArray = [];
    let cloudArray = [];



    function Color() {
       this.color = 0
    }

    function Speed() {
        this.speed = 6
     }

    function Size() {
        this.size = 1;
    }

    function HowMany(){
        this.amount = 1
    }
    function Triangle(){
        this.triangle = true
    }
    function Circle(){
        this.circle = false
    }
    let gui = new dat.GUI();
    let size = new Size();
    let colors = new Color() 
    let speed = new Speed();
    let triangle = new Triangle();
    let circle = new Circle() 
    let howMany = new HowMany();
    gui.add(size, 'size', 1, 5);
    gui.add(howMany, 'amount', 1, 10);
    gui.add(colors, 'color', 0, 255);
    gui.add(speed, 'speed', 6,12);
    gui.add(triangle, 'triangle');
    gui.add(circle, 'circle');

    class Particle {

        constructor(x, y, color) {
          
            this.pos = p.createVector(x, y);
            this.vel = p.createVector(0, 0);
            this.acc = p.createVector(0, 0);
            this.maxSpeed = 1;
            this.maxForce = .25;
            this.r = 16 ;
            this.color = color || 0;
        }



        attracted(target) {
            let force = p5.Vector.sub(target, this.pos);
            force.setMag(this.maxSpeed *speed.speed);
            force.sub(this.vel);
            force.limit(this.maxForce);
            this.applyForce(force);
        }

        applyForce(force) {
            this.acc.add(force);
        }

        update() {
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed * speed.speed);
            this.pos.add(this.vel);
            this.acc.set(0, 0);
        }

        show() {
            p.colorMode(p.HSL, 255);
            p.fill(this.color, 255, 100);
            p.push();
            p.translate(this.pos.x, this.pos.y);
            p.rotate(this.vel.heading());
             circle.circle ? p.circle(-this.r, -this.r / 2, Math.random() * 60 * size.size): null
             triangle.triangle ? p.triangle(-this.r * size.size, -this.r / 4 * size.size, -this.r * size.size, this.r / 4 *  size.size, this.r * size.size, 0) : null;
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
        this.amount = amount;
        this.particleArray = new Array(this.amount);

        for (let i = 0; i < this.amount; i++) {
            this.particleArray[i] = new Particle(
                this.x + p.random(p.width / 10),
                this.y + p.random(p.height / 10),
                this.color
            );
        }

        this.show = function () {
            console.log(attractorsArray.length);
            for (let i = 0; i < this.particleArray.length; i++) {
                this.particleArray[i].attracted(attractorsArray[i % 2]);
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
       let canvas = p.createCanvas(WIDTH, HEIGHT);
       canvas.parent('middle');
        //vid = createVideo('valenciasDanceMoves/waverag.MOV',
        // vidLoad
        //z);
        resetSketch()

        //let resetButton = p.createButton("reset")
        //resetButton.mousePressed(resetSketch)
        //slider = p.createSlider(10, 100, 2)
   
    

        p.background(50)
    };


    p.draw = function () {

        let int = Math.ceil(howMany.amount)
        p.strokeWeight(0);
        p.stroke(51)

        if (pose) {
            let eyeR = pose.rightEye;
            let eyeL = pose.leftEye;
            let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
            p.push();
            p.translate(p.width, 0);
            p.scale(-1, 1);
            //image(vid, 900, 0, WIDTH,HEIGHT)
            //image(video, 0,0, WIDTH/2, HEIGHT/2)
            p.image(video, 0, 0, WIDTH, HEIGHT)
            p.colorMode(p.HSL, 255)
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
                p.stroke(255);

                p.line(a.position.x, a.position.y, b.position.x, b.position.y);
            }

            if (p.frameCount % (p.interval * 60) === 0) {
                //particleArray.push(new Particle(random(width), random(height), hue));
                // add a new cloud every four sec
                cloudArray.push(new Cloud(p.random(p.width), p.random(p.height), int, colors.color || hue));
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

let AttractedP5 = new p5(AttractedShapesSketch);