var model = undefined;
var lab = '';

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
    fetch('./server/actions.php?label=')
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