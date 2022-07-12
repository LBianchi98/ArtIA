var model = undefined;
var lab;

const imgs = document.getElementsByClassName('img');
cocoSsd.load().then(function (loadedModel) {
    var j = 0;
    model = loadedModel;
    for (var i = 0; i < imgs.length; i++) {
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
    //  if(video.srcObject.active == true){
    if (video.srcObject == undefined) {
        return;
    }
    if (model) {
        model.detect(video).then(function (predictions) {
            //console.log(predictions);
            for (let n = 0; n < predictions.length; n++) {
                if (predictions[n].score > 0.9) /* da vedere il fattore */ {
                    lab = predictions[n].class;

                    var p = document.getElementById("webcamItem");
                    p.innerHTML = lab;

                    document.getElementById("label").value = lab;
                }
            }
        });
        //}
        window.requestAnimationFrame(predictWebcam);
    } else {
        location.reload();
    }

}



var ricerca = true;
function searchLabel() {

    if (lab) {
        console.log(lab);

        var spag = document.getElementById("paginaWebcam")
        spag.classList.toggle("nascosta");

        var rpag = document.getElementById("paginaRisultati")
        rpag.classList.toggle("nascosta");

        var p = document.getElementById("label1");
        p.innerHTML = lab;

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = undefined;
                });
        }


        if (ricerca) {
            fetch('./server/actions.php?label=' + lab + '')
                .then(response => {
                    return response.json();
                })
                .then(result => {
                    for (var i = 0; i < result.length; i++) {
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
                        titolo.innerHTML = titolodb;
                        desc.innerHTML = descrizione;
                        container.appendChild(titolo);
                        container.appendChild(desc);
                        newQuadro.appendChild(img);
                        newQuadro.appendChild(container);
                        griglia.appendChild(newQuadro);
                    }
                })
        }
        ricerca = !ricerca;
    } else {
        window.alert("Inquadra in webcam l'oggetto che desideri cercare!");
    }
}


function newSearch() {
    //cambio di pagina
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

    var spag = document.getElementById("paginaWebcam")
    spag.classList.toggle("nascosta");

    var rpag = document.getElementById("paginaRisultati")
    rpag.classList.toggle("nascosta");

    const quadro = document.querySelectorAll('.quadro'); //commentare questo se vogliamo vederne di più
    quadro.forEach(quadro => {
        quadro.remove();
    })


    ricerca = !ricerca;

    lab = "";
    var p = document.getElementById("webcamItem");
    p.innerHTML = lab;

    document.getElementById("label").value = lab;

}





function display_elimina() {
    fetch('./server/actions.php?label=' + lab + '')
        .then(response => {
            return response.json();
        })
        .then(result => {
            for (var i = 0; i < result.length; i++) {
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
                titolo.innerHTML = titolodb;
                desc.innerHTML = descrizione;
                container.appendChild(titolo);
                container.appendChild(desc);
                newQuadro.appendChild(img);
                newQuadro.appendChild(container);
                griglia.appendChild(newQuadro);
            }
        })

}