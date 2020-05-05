class Tabla3D {
    constructor() {
        this.stack = [];
        this.heap = [];
        this.tabla = [];

        this.isDebugger = false;

        this.indiceDebugger = 0;
        this.listaRetornosCall = [];
        this.temporales = [];
        this.indiceTemporal = 0;
        this.isProc = false;
        this.InsertUpdate("h", 0);
        this.InsertUpdate("p", 0);
    }

    InsertUpdate(id, valor) {
        for (let i = 0; i < this.tabla.length; i++) {
            let simbolo = this.tabla[i];
            if (simbolo.Identificador.toLowerCase() == id.toLowerCase()) {
                simbolo.Valor = valor;
                return;
            }
        }
        this.tabla.push(new Simbolo3D(id.toLowerCase(), valor, null));
    }

    InsertUpdateMethod(id, instrucciones) {
        for (let i = 0; i < this.tabla.length; i++) {
            let simbolo = this.tabla[i];
            if (simbolo.Identificador.toLowerCase() == id.toLowerCase()) {
                simbolo.ListaIns = instrucciones;
                return;
            }
        }
        this.tabla.push(new Simbolo3D(id.toLowerCase(), null, instrucciones));
    }

    getItem(id) {
        var i = 0;
        for (i = 0; i < this.tabla.length; i++) {
            let simbolo = this.tabla[i];
            if (simbolo.Identificador.toLowerCase() == id.toLowerCase()) {
                return simbolo.Valor;
            }
        }
        return null;
    }

    getInstructions(id) {
        for (let i = 0; i < this.tabla.length; i++) {
            let simbolo = this.tabla[i];
            if (simbolo.Identificador.toLowerCase() == id.toLowerCase()) {
                return simbolo.ListaIns;
            }
        }
        return null;
    }

    setHeap(posicion, valor) {
        this.heap[posicion] = valor;
    }

    setStack(posicion, valor) {
        this.stack[posicion] = valor;
    }

    getHeap(posicion) {
        return this.heap[posicion];
    }

    getStack(posicion) {
        return this.stack[posicion];
    }
}