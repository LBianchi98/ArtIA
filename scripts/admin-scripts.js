var model = undefined;
var lab = '';

const imgs = document.getElementsByClassName('img');
cocoSsd.load().then(function (loadedModel) {
    var j = 0;
    model = loadedModel;
});
function cleanGriglia() {
    const quadro = document.querySelectorAll('.quadro');
    quadro.forEach(quadro => {
        quadro.remove();
    })
}
function displayForm() {
    cleanGriglia();
    var div = document.getElementById("insertForm");
    div.style.display = "inline-flex";
    document.getElementById("imgsource").value = "";
    document.getElementById("imgtitolo").value = "";
    document.getElementById("imgdesc").value = "";
}
function insertImg() {
    if (model == undefined) {
        alert("devi aspettare che il model sia carico");
    }
    var source = document.getElementById("imgsource").value;
    var titolo = document.getElementById("imgtitolo").value;
    var desc = document.getElementById("imgdesc").value;
    const body = document.getElementsByClassName('container-admin')[0];
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.style.width = '100%';
    img.style.height = '521px';
    img.style.visibility = "hidden";
    img.src = source;
    body.appendChild(img);
    var label;
    var inserita = false;
    if (source && titolo && desc) {
        console.log(img);
        model.detect(img).then(function (predictions) {

            while(predictions[0] != undefined || predictions[0] == undefined){
                label = predictions[0].class;
                if (label != null) {
                    fetch('./server/insert.php?source=' + source + '&label=' + label + '&titolo=' + titolo + '&desc=' + desc)
                    window.alert(titolo + " aggiunta alla collezione!");
                    inserita = true;
                    var div = document.getElementById("insertForm");
                    div.style.display = "none";
                    source = '';
                    label = '';
                    titolo = '';
                    desc = "";
                    document.getElementById("imgsource").value = "";
                    document.getElementById("imgtitolo").value = "";
                    document.getElementById("imgdesc").value = "";
                    if(inserita == true){        
                        break;
                    }
                } else {
                    window.alert("impossibile riconoscere immagine!");
                    break;
                }
                if(inserita == true){
                    break;
                }

        }
    
        });
    } else {
        window.alert("Inserisci informazioni immagine!");
    }
    img.style.display = "none";
    inserita = false;
}



function display_elimina() {
    var div = document.getElementById("insertForm");
    div.style.display = "none";
    cleanGriglia();
    fetch('./server/actions.php?label=')
        .then(response => {
            return response.json();
        })
        .then(result => {
            for (var i = 0; i < result.length; i++) {
                const id = result[i][0];
                const source = result[i][1];
                const titolodb = result[i][2];
                const labeldb = result[i][3];
                const descrizionedb = result[i][4];

                const griglia = document.getElementById("griglia");
                const newQuadro = document.createElement("div");
                newQuadro.classList.add('quadro', 'id-' + id);
                const container = document.createElement("div");
                container.className = "container";
                const elimina = document.createElement("button");
                elimina.id = id;
                const label = document.createElement("p");
                label.className = "imglabel";
                const titolo = document.createElement("p");
                titolo.className = "imgtitolo";
                const desc = document.createElement("p");
                desc.className = "desc";
                const img = document.createElement("img");
                img.style.width = '100%';
                img.className = "img";
                img.src = source;
                elimina.onclick = delete_row;
                elimina.innerHTML = "Elimina questa immagine dalla collezione";
                titolo.innerHTML = "Titolo: " + titolodb;
                label.innerHTML = "Label: " + labeldb;
                desc.innerHTML = "Descrizione: " + descrizionedb;
                container.appendChild(elimina);
                container.appendChild(label);
                container.appendChild(titolo);
                container.appendChild(desc);
                newQuadro.appendChild(img);
                newQuadro.appendChild(container);
                griglia.appendChild(newQuadro);
            }
        })

}


function delete_row() {

    var id = this.id;

    if (confirm("Vuoi davvero eliminare questa immagine?") == true) {

        fetch("./server/delete.php?id=" + id).then(function () {
            var quadro = document.getElementsByClassName('id-' + id);
            quadro.forEach(quadro => {
                quadro.remove();
            })
            alert("Immagine eliminata con successo");
            console.log("Immagine eliminata con successo");
        })
    } else {
                alert("Immagine non eliminata");
                console.log("Immagine non eliminata");
            }
    }