var model = undefined;
var lab = '';
var asd;
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