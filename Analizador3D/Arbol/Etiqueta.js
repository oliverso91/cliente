class Etiqueta {
    constructor(Identificador, fila, columna) {
        this.Identificador = Identificador;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        tabla.InsertUpdate(this.Identificador, this.index);
        return null;
    }

    getOptimizacion() {
        let codigo = '';
        codigo += this.Identificador + ':\n';
        return codigo;
    }
}