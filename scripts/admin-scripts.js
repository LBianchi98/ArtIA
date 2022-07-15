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
    var div = document.getElementById("insertSrc");
    div.style.display = "inline-flex";
    document.getElementById("imgsource").value = "";
    document.getElementById("imgtitolo").value = "";
    document.getElementById("imgdesc").value = "";
    document.getElementById("insertData").style.display = "none";
    document.getElementById('imgtoinsert').remove();
}
var img;
function insertSrc() {
    if (model == undefined) {
        alert("devi aspettare che il model sia carico");
    }else{
        var source = document.getElementById("imgsource").value;
        if(source){
        const body = document.getElementById('insertData');
        img = document.createElement("img");
        img.crossOrigin = "anonymous";
        img.style.width = '325px';
        img.style.marginBottom = "10px";
        img.src = source;
        img.id = 'imgtoinsert';
        img.onerror = function(e) {
            
            alert('Url non valido!');
        };
        img.onload  = function(e) {
            body.insertAdjacentElement('afterbegin', img);
            var data = document.getElementById('insertData');
            data.style.display = "inline-flex";
            document.getElementById('insertSrc').style.display = 'none';
            document.getElementById("imgsource").value = "";
        };
    } else{
        window.alert("Inserisci l'url dell'immagine!");
    }
        
    }

}
function insertImg(){
    var titolo = document.getElementById("imgtitolo").value;
    var desc = document.getElementById("imgdesc").value;
    if (titolo && desc) {
        console.log(img);
        model.detect(img).then(function (predictions) {
                if(predictions[0] == undefined){
                    window.alert("impossibile riconoscere immagine!");
                } else{
                    label = predictions[0].class;
                    if (label != null) {
                        fetch('./server/insert.php?source=' + img.src + '&label=' + label + '&titolo=' + titolo + '&desc=' + desc)
                        window.alert(titolo + " aggiunta alla collezione!");
                        var div = document.getElementById("insertData");
                        div.style.display = "none";
                        label = '';
                        titolo = '';
                        desc = "";
                        document.getElementById("imgtitolo").value = "";
                        document.getElementById("imgdesc").value = "";
            
                        
                    } else {
                        window.alert("impossibile riconoscere immagine!");
                    
                    }


                }
        });
    } else {
        window.alert("Inserisci informazioni immagine!");
    }
}


function display_elimina() {
    var div = document.getElementById("insertSrc");
    document.getElementById("insertData").style.display = "none";
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