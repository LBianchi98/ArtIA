var model = undefined;
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
});

    
const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener('loadeddata', predictWebcam);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function predictWebcam() {
    
    // Now let's start classifying the stream.
    model.detect(video).then(function (predictions) {
        //console.log(predictions);
        for (let n = 0; n < predictions.length; n++) {
            
            if (predictions[n].score > 0.9) /* da vedere il fattore */ {
               var p = document.getElementById("webcamItem");
                p.innerHTML = predictions[n].class;    
            }
        }
    });
    window.requestAnimationFrame(predictWebcam);
  }
  