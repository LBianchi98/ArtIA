var model = undefined;

const imgs = document.getElementsByClassName('img');
cocoSsd.load().then(function (loadedModel) {
    var j=0;
    model = loadedModel;
    for(var i=0; i<imgs.length; i++){
        model.detect(imgs[i]).then(function (predictions) {
            var p = document.getElementsByClassName("imglabel");
            console.log(i);
            p[j].innerHTML = predictions[0].class;
            j++;
        });
    }
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
function searchLabel(){
    //implementare il cambio di pagina
}
  