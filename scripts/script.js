var model = undefined;
//const per tenere variabile di label attuale sia per scrivere in alto che per confrontare

const imgs = document.getElementsByClassName('img');
cocoSsd.load().then(function (loadedModel) {
    var j=0;
    model = loadedModel;
    /*for(var i=0; i<imgs.length; i++){
        model.detect(imgs[i]).then(function (predictions) {
            var p = document.getElementsByClassName("imglabel");
            console.log(i);
            p[j].innerHTML = predictions[0].class;
            j++;
        });
    }*/
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
                
                //store label da passare?

            }
        }

    });
    window.requestAnimationFrame(predictWebcam);
  }
var ricerca = true;
function searchLabel(){
    //implementare il cambio di pagina
    var spag = document.getElementById("paginaWebcam")
    spag.classList.toggle("nascosta");

    var rpag = document.getElementById("paginaRisultati")
    rpag.classList.toggle("nascosta");
    if(ricerca){
        fetch("./server/config.php")
            .then(response =>{
                return response.json();
            })
            .then(result => {
                for(var i= 0; i < result.length; i++)
                {
                    const id = result[i][0];
                    const source = result[i][1];
                    const titolodb = result[i][2];
                    const label = result[i][3];
                    const descrizione = result[i][4];

                    const griglia = document.getElementById("griglia");
                    const newQuadro = document.createElement("div");
                    newQuadro.className = "quadro";
                    const container = document.createElement("div");
                    container.className = "container";
                    const titolo = document.createElement("p");
                    titolo.className = "imgtitolo";
                    const desc = document.createElement("p");
                    desc.className = "desc";
                    const img = document.createElement("img");
                    img.crossOrigin = "anonymous";
                    img.style.width = '100%';
                    img.className = "img";
                    img.src = source;
                    titolo.innerHTML = titolodb;  //prova visualizzazione
                    desc.innerHTML = descrizione;  //prova visualizzazione
                    container.appendChild(titolo);
                    container.appendChild(desc);
                    newQuadro.appendChild(img);
                    newQuadro.appendChild(container);
                    griglia.appendChild(newQuadro);
                }
            })
    }
    ricerca = !ricerca;
}
