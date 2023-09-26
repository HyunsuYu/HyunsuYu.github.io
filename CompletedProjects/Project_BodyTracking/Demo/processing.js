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
  })
}
[출처] 웹캠에서 데이터 받아와서 자세 데이터 추출|작성자 Lioie