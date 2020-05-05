function generar3D() {
    document.getElementById("consola").value = '';
    const content = editor.getValue();
    editor3D.setValue("");
    if (!content) {
        alert("NO HAY NADA PARA ANALIZAR");
        return;
    }
    $.ajax({
            url: "http://localhost:3000/traduccion",
            type: "post",
            data: { entrada: content },
        })
        .done(function(res) {
            if (res.success) {

                document.getElementById('consola').style = 'color: rgb(0, 255, 179);'
                editor3D.setValue(res.c3d);
                document.getElementById('tsVar').innerHTML = generarTs(res.variables);
                document.getElementById('tsFunc').innerHTML = generarTsFunc(res.funciones);
            } else {
                let error = '';
                res.error.map(m => {
                    error += `Error[\nTipo - ${m.tipo} \nDescripcion: ${m.descripcion} \nFila: ${m.fila} Columna: ${m.columna}\n]\n`
                });
                document.getElementById('consola').value = error;
                document.getElementById('consola').style = 'color: red;'
            }
        }).catch(m => {
            alert("Ha ocurrido un error al contactar con el servidor");
        });

}
let c3d = undefined;

function ejecutar() {
    document.getElementById("consola").value = '';
    const content = editor3D.getValue();
    c3d = new C3D(content);
    const res = c3d.analizar();
    if (res != -1) {
        c3d.ejecutar();
    }
}

function debug() {
    document.getElementById("consola").value = '';
    const content = editor3D.getValue();
    c3d = new C3D(content);
    const res = c3d.analizar();
    if (res != -1) {
        c3d.debug();
    }
}

function generarTs(variables) {
    let html = `<table class="table">
    <thead class="thead-dark">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Tipo</th>
            <th scope="col">Identificador</th>
            <th scope="col">Posición</th>
        </tr>
    </thead>
    <tbody>
    `;
    variables.map((m, n) => {
        html += `<tr>
                    <th scope="row">${n}</th>
                    <td>${m.tipo.tipoExplicito}</td>
                    <td>${m.identificador}</td>
                    <td>${m.posicion}</td>
                </tr>`
    });
    html += `</tbody>
  </table>`;
    return html;
}

function generarTsFunc(funciones) {
    let html = `<table class="table">
    <thead class="thead-dark">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Tipo</th>
            <th scope="col">Identificador</th>
            <th scope="col">Parametros</th>
            <th scope="col">Tamaño</th>
        </tr>
    </thead>
    <tbody>
    `;
    funciones.map((m, n) => {
        html += `<tr>
                    <th scope="row">${n}</th>
                    <td>${m.tipo.tipoExplicito}</td>
                    <td>${m.identificador}</td>
                    <td>${m.parametros}</td>
                    <td>${m.size_function}</td>
                </tr>`
    });
    html += `</tbody>
  </table>`;
    return html;
}

window.addEventListener('click', function(evt) {
    if (evt.detail === 2) {
        var linea = editor3D.getCursor().line;
        var containsStyle = getLinePropertyCodeMirror(editor3D.doc, linea);
        if (containsStyle.result) {
            editor3D.removeLineClass(linea, 'background', 'clase4dcss1');
        } else {
            editor3D.addLineClass(linea, 'background', 'clase4dcss1');
            listaBreakpoints = [];
        }
    }
});

function getLinePropertyCodeMirror(nodo, linea, contadorLineas = 0, verificar = true) {
    if (nodo.children != undefined) {
        for (var i = 0; i < nodo.children.length; i++) {
            var m = nodo.children[i];
            var result = getLinePropertyCodeMirror(m, linea, contadorLineas, verificar);
            if (result.result) {
                return { result: result.result, contadorLineas: result.contadorLineas, verificar: true };
            }
            contadorLineas = result.contadorLineas;
            verificar = result.verificar;
            if (!verificar) {
                return { result: result.result, contadorLineas: result.contadorLineas, verificar: false };
            }
        }
    } else {
        //if (nodo.lines.includes(linea)) {
        contadorLineas += nodo.lines.length;
        if (linea < contadorLineas && verificar) {
            var lineaAcceso = linea - (contadorLineas - nodo.lines.length);
            var lineaEvaluar = nodo.lines[lineaAcceso];
            var contienePropiedad = lineaEvaluar.bgClass != undefined;
            return {
                result: contienePropiedad,
                contadorLineas: contadorLineas,
                verificar: false
            };
        } else {
            return { result: false, contadorLineas: contadorLineas, verificar: true };
        }

    }
    return { result: false, contadorLineas: contadorLineas, verificar: true };
}
