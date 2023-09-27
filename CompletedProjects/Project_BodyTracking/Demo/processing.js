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
  var imageScaleFactor = 0.5;
  var outputStride = 16;
  var flipHorizontal = false;

  var imageElement = document.getElementById('myVideo');

  posenet.load().then(function (net) {
    return net.estimateSinglePose(imageElement, imageScaleFactor, flipHorizontal, outputStride)
  }).then(function (pose) {
    console.log(pose);
    console.log(pose.keypoints);

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    for(let i = 0; i < pose.keypoints.length; i++){
      ctx.beginPath();
      ctx.arc(canvas.width - pose.keypoints[i].position.x, canvas.height - pose.keypoints[i].position.y, 5, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'blue';
      ctx.fill();
    }

    // ctx.beginPath();
    // ctx.arc(canvas.width - pose.keypoints[0].position.x, canvas.height - pose.keypoints[0].position.y, 5, 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.fillStyle = 'blue';
    // ctx.fill();
  })
}