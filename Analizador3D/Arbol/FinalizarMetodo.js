class FinalizarMetodo {
    constructor(Identificador, fila, columna) {
        this.Identificador = Identificador;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = this.index;
        //tabla.InsertUpdate(this.Identificador, value);
        return value;
    }

    getOptimizacion() {
        let codigo = '';
        codigo += 'end,,,' + this.Identificador + '\n';
        return codigo;
    }
}