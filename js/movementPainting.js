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
    const WIDTH = window.innerWidth * (3.5 / 8)
    const HEIGHT = window.innerHeight * (3.5 / 8) * 1.33
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

        // let resetButton = p.createButton("reset")
        // resetButton.mousePressed(resetSketch)
        // slider = p.createSlider(10, 100, 2)
        p.background(50)
    };

    p.draw = function () {



        p.translate(p.width, 0);
        p.scale(-1, 1);

        //image(vid, 900, 0, WIDTH,HEIGHT)
        //image(video, 0,0, WIDTH/2, HEIGHT/2)
        p.image(video, 0, 0, WIDTH, HEIGHT)

        p.colorMode(p.HSL, 255)
        p.fill(hue, 255, 100)
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
    const WIDTH = window.innerWidth * (3.5 / 8)
    const HEIGHT = window.innerHeight * (3.5 / 8) * 1.33
    let attractorsArray = [];
    const particleArray = [];
    let cloudArray = [];


    // function Color() {
    //     this.red = false
    //     this.orange = false
    //     this.yellow = false
    //     this.green = false
    //     this.blue = false
    //     this.purple = false
    //     this.random = true

    // }

    function Size() {
        this.size = 1;
    }

    // function HowMany() {
    //     this.amount = 1
    // }
    function Triangle() {
        this.triangle = true
    }
    function Circle() {
        this.circle = false
    }

    function Hips() {
        this.hips = false
    }
    function Wrists() {
        this.wrists = true
    }
    function Shoulders() {
        this.shoulders = false
    }
    function Head() {
        this.head = false
    }
    let gui = new dat.GUI();
    let size = new Size();
    //let colors = new Color()
    let triangle = new Triangle();
    let circle = new Circle()
    //let howMany = new HowMany();
    let hips = new Hips();
    let wrists = new Wrists();
    let shoulders = new Shoulders()
    let head = new Head()

    const settings = gui.addFolder('Settings');
    settings.add(size, 'size', 1, 140);
    //settings.add(howMany, 'amount', 1, 100);



    const shapes = gui.addFolder('Shapes');
    shapes.add(triangle, 'triangle');
    shapes.add(circle, 'circle');

    const bodyParts = gui.addFolder('Draw Body Parts');
    bodyParts.add(shoulders, 'shoulders')
    bodyParts.add(hips, 'hips');
    bodyParts.add(wrists, 'wrists');
    bodyParts.add(head, 'head');

    // const color = gui.addFolder('Colors');
    // color.add(colors, 'red');
    // color.add(colors, 'orange');
    // color.add(colors, 'yellow');
    // color.add(colors, 'green');
    // color.add(colors, 'blue');
    // color.add(colors, 'purple');
    // color.add(colors, 'random');

    // class Particle {
    //     constructor(x, y, color) {
    //         this.pos = p.createVector(x, y);
    //         this.vel = p.createVector(0, 0);
    //         this.acc = p.createVector(0, 0);
    //         this.maxSpeed = 1;
    //         this.maxForce = .25;
    //         this.r = 8;
    //         this.color = color || 0;
    //     }

    //     attracted(target) {
    //         let force = p5.Vector.sub(target, this.pos);
    //         force.setMag(this.maxSpeed *speed.speed);
    //         force.sub(this.vel);
    //         force.limit(this.maxForce);
    //         this.applyForce(force);
    //     }

    //     applyForce(force) {
    //         this.acc.add(force);
    //     }

    //     update() {
    //         this.vel.add(this.acc);
    //         this.vel.limit(this.maxSpeed * speed.speed);
    //         this.pos.add(this.vel);
    //         this.acc.set(0, 0);
    //     }

    //     show() {
    //         p.colorMode(p.HSL, 255);
    //         p.fill(this.color, 255, 100);
    //         p.push();
    //         p.translate(this.pos.x, this.pos.y);
    //         p.rotate(this.vel.heading());
    //         circle.circle ? p.circle(-this.r, -this.r / 2, Math.random() * 60 * size.size): null
    //         triangle.triangle ? p.triangle(-this.r * size.size, -this.r / 4 * size.size, -this.r * size.size, this.r / 4 *  size.size, this.r * size.size, 0) : null;
    //         p.pop();
    //     }

    //     edges() {
    //         if (this.pos.x > width + this.r) {
    //             this.pos.x = -this.r;
    //         } else if (this.pos.x < -this.r) {
    //             this.pos.x = width + this.r;
    //         }
    //         if (this.pos.y > height + this.r) {
    //             this.pos.y = -this.r;
    //         } else if (this.pos.y < -this.r) {
    //             this.pos.y = height + this.r;
    //         }
    //     }
    // }


    // function Cloud(x, y, amount, color) {
    //     this.x = x;
    //     this.y = y;
    //     this.color = color;

    //     this.particleArray = new Array(amount);

    //     for (let i = 0; i < amount; i++) {
    //         this.particleArray[i] = new Particle(
    //             this.x + p.random(p.width / 10),
    //             this.y + p.random(p.height / 10),
    //             this.color
    //         );
    //     }

    //     this.show = function () {
    //         console.log(attractorsArray.length);
    //         for (let i = 0; i < this.particleArray.length; i++) {
    //             this.particleArray[i].attracted(attractorsArray[i % 4]);
    //             this.particleArray[i].update();
    //             this.particleArray[i].show();
    //         }
    //     };
    // }

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
        //cloud = new Cloud(p.random(p.width), p.random(p.height), 1, 100);
        video = p.createCapture(p.VIDEO);
        video.size(WIDTH, HEIGHT);
        video.hide();
        poseNet = ml5.poseNet(video, modelLoaded);
        //poseNet1 = ml5.poseNet(vid, modelLoaded);
        poseNet.on("pose", gotPoses);
        //poseNet1.on("pose", gotPoses);
        // cloudArray = []
    }

    p.setup = function () {

        let rightCanvas = p.createCanvas(WIDTH, HEIGHT);
        rightCanvas.parent('rightCanvas');

        resetSketch()

        // let resetButton = p.createButton("reset")
        // resetButton.mousePressed(resetSketch)
        // slider = p.createSlider(10, 100, 2)
        p.background(255)
    };

    p.draw = function () {
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
            //p.image(video,0,0, WIDTH, HEIGHT)
            p.colorMode(p.HSL, 255)
            p.fill(hue, 255, 100)
            //ellipse(pose.nose.x, pose.nose.y, d);
            //fill(0, 0, 255);
            // ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
            // ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

            //attractorsArray = [];

            // attractorsArray.push(p.createVector(pose.rightWrist.x, pose.rightWrist.y));
            // attractorsArray.push(p.createVector(pose.leftWrist.x, pose.leftWrist.y));
            // attractorsArray.push(createVector(pose.rightHip.x, pose.rightHip.y));
            // attractorsArray.push(createVector(pose.leftHip.x, pose.leftHip.y));



            for (let i = 0; i < skeleton.length; i++) {
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                p.strokeWeight(2);
                p.colorMode(p.HSL, 255);
                p.stroke(0);

                p.line(a.position.x, a.position.y, b.position.x, b.position.y);
            }


            // if(colors.red){
            // p.fill(255, 255, 100)
            // hips.hips ? p.circle(pose.rightHip.x, pose.rightHip.y, size.size) : null
            // hips.hips ? p.circle(pose.leftHip.x, pose.leftHip.y, size.size) : null

            // p.fill(255, 255, 100)
            // wrists.wrists ? p.circle(pose.rightWrist.x, pose.rightWrist.y, size.size) : null;
            // wrists.wrists ? p.circle(pose.leftWrist.x, pose.leftWrist.y, size.size) : null;

            // p.fill(255, 255, 100)
            // shoulders.shoulders ? p.circle(pose.leftShoulder.x, pose.leftShoulder.y, size.size) : null;
            // shoulders.shoulders ? p.circle(pose.rightShoulder.x, pose.rightShoulder.y, size.size): null;

            // p.fill(255, 255, 100)
            // head.head ? p.circle(pose.nose.x, pose.nose.y, size.size*3) : null;
            // }else if(colors.orange){
            //     p.fill(20, 255, 100)
            //     hips.hips ? p.circle(pose.rightHip.x, pose.rightHip.y, size.size) : null
            //     hips.hips ? p.circle(pose.leftHip.x, pose.leftHip.y, size.size) : null

            //     p.fill(20, 255, 100)
            //     wrists.wrists ? p.circle(pose.rightWrist.x, pose.rightWrist.y, size.size) : null;
            //     wrists.wrists ? p.circle(pose.leftWrist.x, pose.leftWrist.y, size.size) : null;

            //     p.fill(20, 255, 100)
            //     shoulders.shoulders ? p.circle(pose.leftShoulder.x, pose.leftShoulder.y, size.size) : null;
            //     shoulders.shoulders ? p.circle(pose.rightShoulder.x, pose.rightShoulder.y, size.size): null;

            //     p.fill(20, 255, 100)
            //     head.head ? p.circle(pose.nose.x, pose.nose.y, size.size*3) : null;
            // }
            // if(colors.yellow){
            //     colorArray.push(40)
            // }
            // if(colors.green){
            //     colorArray.push( 60)
            // }
            // if(colors.blue){
            //     colorArray.push( 150 )
            // } 
            // if(colors.purple){
            //     colorArray.push(200)
            // }
            // if(colors.random){
            //     colorArray.push(hue)
            // }
            if (circle.circle) {

                p.fill(hue, 255, 100)
                hips.hips ? p.circle(pose.rightHip.x, pose.rightHip.y, size.size) : null
                hips.hips ? p.circle(pose.leftHip.x, pose.leftHip.y, size.size) : null

                p.fill(hue, 255, 100)
                wrists.wrists ? p.circle(pose.rightWrist.x, pose.rightWrist.y, size.size) : null;
                wrists.wrists ? p.circle(pose.leftWrist.x, pose.leftWrist.y, size.size) : null;

                p.fill(hue, 255, 100)
                shoulders.shoulders ? p.circle(pose.leftShoulder.x, pose.leftShoulder.y, size.size) : null;
                shoulders.shoulders ? p.circle(pose.rightShoulder.x, pose.rightShoulder.y, size.size) : null;

                p.fill(hue, 255, 100)
                head.head ? p.circle(pose.nose.x, pose.nose.y, size.size * 2) : null;
            }
            if (triangle.triangle) {
               shoulders.shoulders ? p.triangle(
                    ((((pose.leftShoulder.x)) + 30) + size.size) / 1.1,
                    (((pose.leftShoulder.y) + 75)) + size.size + Math.random() * 60 / 1.1,
                    ((((pose.leftShoulder.x)) + 58)) / 1.1,
                    (((pose.leftShoulder.y) + 20)) / 1.2,
                    ((((pose.leftShoulder.x)) + 86) + size.size+ Math.random() * 60) / 1.1,
                    (((pose.leftShoulder.y) + 75) + size.size+ Math.random() * 60) / 1.2
                ) : null;
                shoulders.shoulders ? p.triangle(
                    ((((pose.rightShoulder.x)) + 30) + size.size) / 1.1,
                    (((pose.rightShoulder.y) + 75)) + size.size + Math.random() * 60 / 1.1,
                    ((((pose.rightShoulder.x)) + 58)) / 1.1,
                    (((pose.rightShoulder.y) + 20)) / 1.2,
                    ((((pose.rightShoulder.x)) + 86) + size.size+ Math.random() * 60) / 1.1,
                    (((pose.rightShoulder.y) + 75) + size.size+ Math.random() * 60) / 1.2
                ) : null;
                hips.hips ? p.triangle(
                    ((((pose.leftHip.x)) + 30) + size.size + Math.random() * 60) / 1.1,
                    (((pose.leftHip.y) + 75)) + size.size + Math.random() * 60 / 1.1,
                    ((((pose.leftHip.x)) + 58)) / 1.1,
                    (((pose.leftHip.y) + 20)) / 1.2,
                    ((((pose.leftHip.x)) + 86) + size.size+ Math.random() * 60) / 1.1,
                    (((pose.leftHip.y) + 75) + size.size+ Math.random() * 60) / 1.2
                ) : null;
                hips.hips ? p.triangle(
                    ((((pose.rightHip.x)) + 30) + size.size + Math.random() * 60) / 1.1,
                    (((pose.rightHip.y) + 75)) + size.size + Math.random() * 60 / 1.1,
                    ((((pose.rightHip.x)) + 58)) / 1.1,
                    (((pose.rightHip.y) + 20)) / 1.2,
                    ((((pose.rightHip.x)) + 86) + size.size+ Math.random() * 60) / 1.1,
                    (((pose.rightHip.y) + 75) + size.size+ Math.random() * 60) / 1.2
                ) : null;
                wrists.wrists ? p.triangle(
                    ((((pose.leftWrist.x)) + 30) + size.size + Math.random() * 60) / 1.1,
                    (((pose.leftWrist.y) + 75)) + size.size + Math.random() * 60 / 1.1,
                    ((((pose.leftWrist.x)) + 58)) / 1.1,
                    (((pose.leftWrist.y) + 20)) / 1.2,
                    ((((pose.leftWrist.x)) + 86) + size.size+ Math.random() * 60) / 1.1,
                    (((pose.leftWrist.y) + 75) + size.size+ Math.random() * 60) / 1.2
                ) : null;
                wrists.wrists ? p.triangle(
                    ((((pose.rightWrist.x)) + 30) + size.size + Math.random() * 60) / 1.1,
                    (((pose.rightWrist.y) + 75)) + size.size + Math.random() * 60 / 1.1,
                    ((((pose.rightWrist.x)) + 58)) / 1.1,
                    (((pose.rightWrist.y) + 20)) / 1.2,
                    ((((pose.rightWrist.x)) + 86) + size.size+ Math.random() * 60) / 1.1,
                    (((pose.rightWrist.y) + 75) + size.size+ Math.random() * 60) / 1.2
                ) : null;

                head.head ?   p.triangle(
                    ((((pose.nose.x)) + 30) + size.size + Math.random() * 60) / 1.1,
                    (((pose.nose.y) + 75)) + size.size + Math.random() * 60 / 1.1,
                    ((((pose.nose.x)) + 58)) / 1.1,
                    (((pose.nose.y) + 20)) / 1.2,
                    ((((pose.nose.x)) + 86) + size.size + Math.random() * 60) / 1.1,
                    (((pose.nose.y) + 75) + size.size + Math.random() * 60) / 1.2
                ) : null ;
            }


            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                p.colorMode(p.HSL, 255);
                p.noStroke()
                p.noFill()
                //p.stroke(hue, 255, 100);
                p.ellipse(x, y, 10, 10);
            }



            // if (p.frameCount % (p.interval * 60) === 0) {
            //     //particleArray.push(new Particle(random(width), random(height), hue));
            //     // add a new cloud every four sec
            //     cloudArray.push(new Cloud(p.random(p.width), p.random(p.height), howMany.amount,  colors.color || hue));
            // }
            // for (let i = 0; i < cloudArray.length; i++) {
            //     cloudArray[i].show();
            // }
            hue > 255 ? (hue = 0) : hue++;
            p.noStroke();
            p.pop();
        }
    };
};

let rightP5 = new p5(rightAttractedShapesSketch);