class Llamada3D {
    constructor(Identificador, fila, columna) {
        this.Identificador = Identificador;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let index = tabla.getItem(this.Identificador);
        return index;
    }

    getOptimizacion() {
        let codigo = 'call,,,' + this.Identificador + '\n';
        return codigo;
    }
}