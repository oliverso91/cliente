class C3D {
    constructor(entrada) {
        this.entrada = entrada;
        this.ast3D = null;
        this.tabla = new Tabla3D();
        this.indice = 0;
        this.listaBreakpoints = [];
    }

    analizar() {
        if (!this.entrada) {
            alert("NO HAY NADA PARA ANALIZAR");
            return -1;
        }
        this.ast3D = Gramatica3D.parse(this.entrada);
    }

    ejecutar() {
        this.ast3D.instrucciones.map(ins => {
            if (ins instanceof Etiqueta ||
                ins instanceof IniciarMetodo ||
                ins instanceof FinalizarMetodo ||
                ins instanceof Metodo3D) {
                ins.Ejecutar(this.tabla);
            }
        });
        for (let indice = 0; indice < this.ast3D.instrucciones.length; indice++) {
            const instruccion = this.ast3D.instrucciones[indice];
            if (instruccion instanceof Etiqueta) {
                continue;
            }

            if (instruccion instanceof SaltoCondicional ||
                instruccion instanceof SaltoIncondicional) {
                const temp = instruccion.Ejecutar(this.tabla);
                if (temp != null && temp != -1) {
                    indice = temp;
                }
            } else if (instruccion instanceof Llamada3D) {
                const temp = instruccion.Ejecutar(this.tabla);
                if (temp != null && temp != -1) {
                    this.tabla.listaRetornosCall.push(indice);
                    indice = temp;
                }
            } else if (instruccion instanceof IniciarMetodo) {
                let temp = instruccion;
                temp = temp.index + temp.cantidadIns + 1; //inicio metodo + cantidad de instrucciones + end metodo
                if (temp != null && temp != -1) {
                    indice = temp;
                }
            } else if (instruccion instanceof FinalizarMetodo) {
                const temp = this.tabla.listaRetornosCall.pop();
                if (temp != null && temp != -1) {
                    indice = temp;
                }
            } else {
                instruccion.Ejecutar(this.tabla);
            }
        }
    }

    debug() {
        document.getElementById("btnDebug").disabled = true;
        document.getElementById("btnNextStep").style.display = "inline";
        document.getElementById("btnNextBreak").style.display = "inline";
        document.getElementById("btnStop").style.display = "inline";
        console.log(this.ast3D.instrucciones)
        this.ast3D.instrucciones.map(ins => {
            if (ins instanceof Etiqueta ||
                ins instanceof IniciarMetodo ||
                ins instanceof FinalizarMetodo ||
                ins instanceof Metodo3D) {
                ins.Ejecutar(this.tabla);
            }
        });
        let posicion = 0;

        for (let i = 0; i < editor3D.lineCount(); i++) {
            const containsStyle = getLinePropertyCodeMirror(editor3D.doc, i);
            if (containsStyle.result) {
                if (!this.listaBreakpoints.includes(i + 1)) {
                    this.listaBreakpoints.push(i + 1);
                }
            }
        }

        for (let i = 0; i < this.ast3D.instrucciones.length; i++) {
            posicion = this.listaBreakpoints.indexOf(this.ast3D.instrucciones[i].fila);
            if (posicion != -1) {
                editor3D.addLineClass(this.listaBreakpoints[posicion] - 1, 'background', 'clase4dcss');
                break;
            }
            this.ejecutarInstruccion();
            i = this.indice - 1;
        }
        this.actualizarStack();
        this.actualizarHeap();
        this.actualizarSimbolos();
        if (this.indice == this.ast3D.instrucciones.length) {
            this.detenerDebugger();
        }
    }

    continuarInstruccion() {
        editor3D.removeLineClass(this.ast3D.instrucciones[this.indice].fila - 1, 'background', 'clase4dcss');
        this.ejecutarInstruccion();
        this.actualizarStack();
        this.actualizarHeap();
        this.actualizarSimbolos();
        // actualizarSimbolos();
        if (this.indice == this.ast3D.instrucciones.length) {
            this.detenerDebugger();
        } else {
            editor3D.addLineClass(this.ast3D.instrucciones[this.indice].fila - 1, 'background', 'clase4dcss');
        }
    }

    continuarDebugger() {
        this.ejecutarInstruccion();
        let posicion = 0;
        for (let i = this.indice; i < this.ast3D.instrucciones.length; i++) {
            posicion = this.listaBreakpoints.indexOf(this.ast3D.instrucciones[i].fila);
            if (posicion != -1) {
                editor3D.addLineClass(this.listaBreakpoints[posicion] - 1, 'background', 'clase4dcss');
                break;
            }
            this.ejecutarInstruccion();
            i = this.indice - 1;
        }
        this.actualizarStack();
        this.actualizarHeap();
        this.actualizarSimbolos();
        if (this.indice == this.ast3D.instrucciones.length) {
            this.detenerDebugger();
        }
    }

    detenerDebugger() {
        for (let i = 0; i < editor3D.lineCount(); i++) {
            editor3D.removeLineClass(i, 'background', 'clase4dcss');
        }
        document.getElementById("btnDebug").disabled = false;
        document.getElementById("btnNextStep").style.display = "none";
        document.getElementById("btnNextBreak").style.display = "none";
        document.getElementById("btnStop").style.display = "none";
        this.ast3D.instrucciones = null;
        this.tabla = null;
        this.listaBreakpoints = [];
        // document.getElementById("btnActivarDebugger").disabled = false;
    }

    removeBreakpoints() {
        for (let i = 0; i < editor3D.lineCount(); i++) {
            editor3D.removeLineClass(i, 'background', 'clase4dcss1');
        }
    }

    actualizarStack() {
        let cabecera = '<thead><tr><th scope="colgroup">Stack</th><th scope="colgroup">' + this.tabla.getItem('p') + '</th></tr>'
        cabecera += '<tr><th>Dir</th><th>Val</th></tr></thead>';
        let body = ''
        for (let i = 0; i < this.tabla.stack.length; i++) {
            body += '<tr><td>' + i + '</td><td>' + this.tabla.stack[i] + '</td></tr>';
        }
        document.getElementById('tablaStack').innerHTML = cabecera + body;
    }
    actualizarHeap() {
        let cabecera = '<thead><tr><th scope="colgroup">Heap</th><th scope="colgroup">' + this.tabla.getItem('h') + '</th></tr>'
        cabecera += '<tr><th>Dir</th><th>Val</th></tr></thead>';
        let body = ''
        for (let i = 0; i < this.tabla.heap.length; i++) {
            body += '<tr><td>' + i + '</td><td>' + this.tabla.heap[i] + '</td></tr>';
        }
        document.getElementById('tablaHeap').innerHTML = cabecera + body;
    }
    actualizarSimbolos() {
        let cabecera = `<thead><tr>
                            <th scope="col">Temp</th>
                            <th scope="col"> - </th>
                        </tr>

                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Val</th>
                        </tr> </thead>`;
        let body = ''
        for (let i = 0; i < this.tabla.tabla.length; i++) {
            if (this.tabla.tabla[i].Identificador.match('^t[0-9]+$')) {
                body += '<tr><td>' + this.tabla.tabla[i].Identificador + '</td><td>' + this.tabla.tabla[i].Valor + '</td></tr>';
            }
        }
        document.getElementById('tablaSim').innerHTML = cabecera + body;
    }

    ejecutarInstruccion() {
        const instruccion = this.ast3D.instrucciones[this.indice];
        if (instruccion instanceof Etiqueta) {
            this.indice++;
            return;
        }

        if (instruccion instanceof SaltoCondicional ||
            instruccion instanceof SaltoIncondicional) {
            const temp = instruccion.Ejecutar(this.tabla);
            if (temp != null && temp != -1) {
                this.indice = temp;
            }
        } else if (instruccion instanceof Llamada3D) {
            const temp = instruccion.Ejecutar(this.tabla);
            if (temp != null && temp != -1) {
                this.tabla.listaRetornosCall.push(this.indice);
                this.indice = temp;
            }
        } else if (instruccion instanceof IniciarMetodo) {
            let temp = instruccion;
            temp = temp.index + temp.cantidadIns + 1; //inicio metodo + cantidad de instrucciones + end metodo
            if (temp != null && temp != -1) {
                this.indice = temp;
            }
        } else if (instruccion instanceof FinalizarMetodo) {
            const temp = this.tabla.listaRetornosCall.pop();
            if (temp != null && temp != -1) {
                this.indice = temp;
            }
        } else {
            instruccion.Ejecutar(this.tabla);
        }
        this.indice++;
    }
}