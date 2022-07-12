var model = undefined;
var lab = '';
var asd;
const imgs = document.getElementsByClassName('img');
cocoSsd.load().then(function (loadedModel) {
    var j = 0;
    model = loadedModel;
});


function insertImg(){
    console.log('ciao');
    if(model == undefined){
        alert("devi aspettare che il model sia carico");
    }
    var source = document.getElementById("imgsource").value;
    const body = document.getElementsByClassName('container-admin')[0];
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.style.width = '100%';
    //img.style.height = '521px';
    img.style.display = 'none';
    img.src = source;
    body.appendChild(img);
    var label;
    model.detect(img).then(function (predictions) {
        label = predictions[0].class;
        if(label != null){
        fetch('./server/insert.php?source=' + source + '&label=' + label).then(response =>{
            console.log('tutto ok');
        });
    }

    });
    
}



function display_elimina() {
    const quadro = document.querySelectorAll('.quadro'); //commentare questo se vogliamo vederne di più
    quadro.forEach(quadro => {
        quadro.remove();
    })

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
                newQuadro.className = "quadro";
                const container = document.createElement("div");
                container.className = "container";
                const elimina = document.createElement("button");
                elimina.id = "elimina-immagine-"+id;
                const label = document.createElement("p");
                label.className = "imglabel";
                const titolo = document.createElement("p");
                titolo.className = "imgtitolo";
                const desc = document.createElement("p");
                desc.className = "desc";
                const img = document.createElement("img");
                img.crossOrigin = "anonymous";
                img.style.width = '100%';
                img.className = "img";
                img.src = source;
                elimina.onclick = delete_row;
                elimina.innerHTML = "Elimina questa immagine dalla collezione";
                titolo.innerHTML = "Titolo: "+titolodb;
                label.innerHTML = "Label: "+labeldb;
                desc.innerHTML = "Descrizione: "+descrizionedb;
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


function delete_row(id)
    {

        var data= {};
        data.row = id;

/*
        $.ajax({
          url: 'delete_formation.php',
          type: 'POST',
          data: data,

          success: function(output){
            //alert(output);
          }
        });*/
        document.getElementById(id).innerHTML="Immagine eliminata";
    
    }