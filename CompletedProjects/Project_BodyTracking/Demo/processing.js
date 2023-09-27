// processing.js
var myVideoStream = document.getElementById('myVideo')     // make it a global variable
var myStoredInterval = 0

function getVideo() {
  navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.getMedia({ video: true, audio: false },

    function (stream) {
      myVideoStream.srcObject = stream
      myVideoStream.play();
    },

    function (error) {
      alert('webcam not working');
    });
}

function takeSnapshot() {
  var myCanvasElement = document.getElementById('myCanvas');
  var myCTX = myCanvasElement.getContext('2d');
  myCTX.drawImage(myVideoStream, 0, 0, myCanvasElement.width, myCanvasElement.height);

  StartTracking()
}

function takeAuto() {
  takeSnapshot() // get snapshot right away then wait and repeat
  clearInterval(myStoredInterval)
  myStoredInterval = setInterval(function () {
    takeSnapshot()
  }, document.getElementById('myInterval').value);
}

function StartTracking() {
  var imageScaleFactor = 1.0;
  var outputStride = 8;
  var flipHorizontal = false;

  var imageElement = document.getElementById('myVideo');

  posenet.load().then(function (net) {
    return net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
  }).then(function (pose) {
    // console.log(pose);
    // console.log(pose.keypoints);

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    console.clear();
    for(let i = 0; i < pose.keypoints.length; i++){
      if(pose.keypoints[i].score >= 0.9)
      {
        ctx.beginPath();
        ctx.arc(pose.keypoints[i].position.x, pose.keypoints[i].position.y, 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'blue';
        ctx.fill();

        console.log(pose.keypoints[i].part + " x : " + pose.keypoints[i].position.x + ", y : " + pose.keypoints[i].position.y);
      }
    }

    // ctx.beginPath();
    // ctx.arc(canvas.width - pose.keypoints[0].position.x, canvas.height - pose.keypoints[0].position.y, 5, 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.fillStyle = 'blue';
    // ctx.fill();
  })

  // detectPoseInRealTime(imageElement, posenet.load());
}

// const guiState = {
//   algorithm: 'single-pose',
//   input: {
//     mobileNetArchitecture: isMobile() ? '0.50' : '1.01',
//     outputStride: 16,
//     imageScaleFactor: 0.5,
//   },
//   singlePoseDetection: {
//     minPoseConfidence: 0.1,
//     minPartConfidence: 0.5,
//   },
//   multiPoseDetection: {
//     maxPoseDetections: 2,
//     minPoseConfidence: 0.1,
//     minPartConfidence: 0.3,
//     nmsRadius: 20.0,
//   },
//   output: {
//     showVideo: true,
//     showSkeleton: true,
//     showPoints: true,
//   },
//   net: null,
// };

// function detectPoseInRealTime(video, net) {
//   const canvas = document.getElementById('output');
//   const ctx = canvas.getContext('2d');
//   const flipHorizontal = true; // since images are being fed from a webcam

//   canvas.width = videoWidth;
//   canvas.height = videoHeight;

//     // Scale an image down to a certain factor. Too large of an image will slow down
//     // the GPU
//   const imageScaleFactor = guiState.input.imageScaleFactor;
//   const outputStride = Number(guiState.input.outputStride);

//   let poses = [];
//   let minPoseConfidence;
//   let minPartConfidence;
//   // switch (guiState.algorithm) {
//   //   case 'single-pose':
//   //     const pose = await guiState.net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);
//   //     poses.push(pose);

//   //     minPoseConfidence = Number(
//   //       guiState.singlePoseDetection.minPoseConfidence);
//   //     minPartConfidence = Number(
//   //       guiState.singlePoseDetection.minPartConfidence);
//   //     break;
//   //   case 'multi-pose':
//   //     poses = await guiState.net.estimateMultiplePoses(video, imageScaleFactor, flipHorizontal, outputStride,
//   //       guiState.multiPoseDetection.maxPoseDetections,
//   //       guiState.multiPoseDetection.minPartConfidence,
//   //       guiState.multiPoseDetection.nmsRadius);

//   //     minPoseConfidence = Number(guiState.multiPoseDetection.minPoseConfidence);
//   //     minPartConfidence = Number(guiState.multiPoseDetection.minPartConfidence);
//   //     break;
//   // }

//   poses = net.estimateMultiplePoses(video, imageScaleFactor, flipHorizontal, outputStride,
//     guiState.multiPoseDetection.maxPoseDetections,
//     guiState.multiPoseDetection.minPartConfidence,
//     guiState.multiPoseDetection.nmsRadius);

//   minPoseConfidence = Number(guiState.multiPoseDetection.minPoseConfidence);
//   minPartConfidence = Number(guiState.multiPoseDetection.minPartConfidence);

//   ctx.clearRect(0, 0, videoWidth, videoHeight);

//   if (guiState.output.showVideo) {
//     ctx.save();
//     ctx.scale(-1, 1);
//     ctx.translate(-videoWidth, 0);
//     ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
//     ctx.restore();
//   }

//   // For each pose (i.e. person) detected in an image, loop through the poses
//   // and draw the resulting skeleton and keypoints if over certain confidence
//   // scores
//   poses.forEach(({ score, keypoints }) => {
//     if (score >= minPoseConfidence) {
//       if (guiState.output.showPoints) {
//         drawKeypoints(keypoints, minPartConfidence, ctx);
//       }
//       if (guiState.output.showSkeleton) {
//         drawSkeleton(keypoints, minPartConfidence, ctx, net);
//       }
//     }
//   });
// }

// function drawSkeleton(keypoints, minConfidence, ctx, net, scale = 1) {
//   const adjacentKeyPoints = net.getAdjacentKeyPoints(
//     keypoints, minConfidence);

//   adjacentKeyPoints.forEach((keypoints) => {
//     drawSegment(toTuple(keypoints[0].position),
//       toTuple(keypoints[1].position), color, scale, ctx);
//   });
// }

// function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
//   ctx.beginPath();
//   ctx.moveTo(ax * scale, ay * scale);
//   ctx.lineTo(bx * scale, by * scale);
//   ctx.lineWidth = lineWidth;
//   ctx.strokeStyle = color;
//   ctx.stroke();
// }

// function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
//   for (let i = 0; i < keypoints.length; i++) {
//     const keypoint = keypoints[i];

//     if (keypoint.score < minConfidence) {
//       continue;
//     }

//     const { y, x } = keypoint.position;
//     ctx.beginPath();
//     ctx.arc(x * scale, y * scale, 3, 0, 2 * Math.PI);
//     ctx.fillStyle = color;
//     ctx.fill();
//   }
// }