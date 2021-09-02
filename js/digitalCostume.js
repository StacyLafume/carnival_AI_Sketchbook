

let costumeSketch = function (p) {
//     let video;
//     let poseNet;
//     let pose;
//     let skeleton;
    let leftFeather 
    let rightFeather
//     const WIDTH = window.innerWidth *  (5/8)
//     const HEIGHT = window.innerHeight  * (5/8)  * 1.33 

    p.preload = function (){
        rightFeather = p.createImg('/images/feather1.png')
       leftFeather = p.createImg('/images/feather2.png')
    }
//     p.setup = function () {
//         let canvas = p.createCanvas(WIDTH, HEIGHT);
//         canvas.parent('middle');
//         video = p.createCapture(p.VIDEO);
//         video.hide();
//         poseNet = ml5.poseNet(video, modelLoaded);
//         poseNet.on('pose', gotPoses);
//     }

//     function gotPoses(poses) {
//         // console.log(poses);
//         if (poses.length > 0) {
//             pose = poses[0].pose;
//             skeleton = poses[0].skeleton;
//         }
//     }

//     function modelLoaded() {
//         console.log('poseNet ready');
//     }

//     p.draw = function () {

//         p.image(video, 0, 0,WIDTH, HEIGHT);

//   if (pose) {
//     let eyeR = pose.rightEye;
//     let eyeL = pose.leftEye;
//     let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
//     p.fill('white');
//    // p.ellipse(pose.nose.x, pose.nose.y, d);
//     p.fill('white');
//     p.ellipse(pose.rightWrist.x, pose.rightWrist.y, 1);
//     p.ellipse(pose.leftWrist.x, pose.leftWrist.y, 1);

//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       p.fill('white');
//       p.ellipse(x, y, 1, 1);
//     }

//     for (let i = 0; i < skeleton.length; i++) {
//       let a = skeleton[i][0];
//       let b = skeleton[i][1];
//       p.strokeWeight(1);
//       p.stroke(255);
//       p.line(a.position.x, a.position.y, b.position.x, b.position.y);
//     }

//     rightFeather.position(pose.leftShoulder.x + 330,pose.leftShoulder.y - 50)
//     leftFeather.position(pose.rightShoulder.x + 120,pose.rightShoulder.y - 10)

//   }






//     //     p.translate(p.width, 0);
//     //     p.scale(-1, 1);
       
//     //     p.image(video, 0, 0, WIDTH, HEIGHT)

//     //     if (pose) {
//     //         let eyeR = pose.rightEye;
//     //         let eyeL = pose.leftEye;
//     //         let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
//     //         //p.fill(255, 0, 0);
//     //         //p.ellipse(pose.nose.x, pose.nose.y, d/2);
//     //         p.fill(0, 0, 255);
//     //         // p.ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
//     //         // p.ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

//     //         for (let i = 0; i < pose.keypoints.length; i++) {
//     //             let x = pose.keypoints[i].position.x;
//     //             let y = pose.keypoints[i].position.y;
//     //             p.fill(255, 0, 0);
//     //             p.ellipse(x, y, 16, 16);
//     //         }

//     //         for (let i = 0; i < skeleton.length; i++) {
//     //             let a = skeleton[i][0];
//     //             let b = skeleton[i][1];
//     //             p.strokeWeight(2);
//     //             p.stroke(255);
//     //             p.line(a.position.x, a.position.y, b.position.x, b.position.y);
//     //         }
//     //     }

//     // }
// }

let video;
let poseNet;
let pose;
let skeleton;
let vid
const WIDTH = window.innerWidth * (5 / 8)
const HEIGHT = window.innerHeight * (5 / 8) * 1.33

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
    //cloud = new Cloud(p.random(p.width), p.random(p.height), 1, 100);
    video = p.createCapture(p.VIDEO)//;
    video.size(WIDTH, HEIGHT);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    //poseNet1 = ml5.poseNet(vid, modelLoaded);
    poseNet.on("pose", gotPoses);
    //poseNet1.on("pose", gotPoses);
    //cloudArray = []
   
}

p.setup = function () {
    let canvas = p.createCanvas(WIDTH, HEIGHT);
    canvas.parent('middle');
    vid = p.createVideo('/videos/adele/slowWine.mp4',
     vidLoad
    );
    function vidLoad() {
        vid.loop();
        vid.volume(0);
      }
    
    resetSketch()

    //let resetButton = p.createButton("reset")
    //resetButton.mousePressed(resetSketch)
    //slider = p.createSlider(10, 100, 2)



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
        // p.translate(p.width, 0);
        // p.scale(-1, 1);
        //p.image(vid, 900, 0, WIDTH,HEIGHT)
        //image(video, 0,0, WIDTH/2, HEIGHT/2)
   
        p.image(video, 0, 0, WIDTH, HEIGHT)
        p.colorMode(p.HSL, 255)
        p.fill(0, 255, 100)
        //ellipse(pose.nose.x, pose.nose.y, d);
        //fill(0, 0, 255);
        // ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
        // ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

   



       

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

    
    rightFeather.position(pose.leftShoulder.x + 330,pose.leftShoulder.y - 50)
    leftFeather.position(pose.rightShoulder.x + 120,pose.rightShoulder.y - 10)
       

        p.noStroke();
        p.pop();

    }
};

}

let costumeP5 = new p5(costumeSketch);

 




// let video;
// let poseNet;
// let pose;
// let skeleton;

// function setup() {
//   createCanvas(640, 480);
//   video = createCapture(VIDEO);
//   video.hide();
//   poseNet = ml5.poseNet(video, modelLoaded);
//   poseNet.on('pose', gotPoses);
// }

// function gotPoses(poses) {
//   //console.log(poses);
//   if (poses.length > 0) {
//     pose = poses[0].pose;
//     skeleton = poses[0].skeleton;
//   }
// }

// function modelLoaded() {
//   console.log('poseNet ready');
// }

// function draw() {
  
// }