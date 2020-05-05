class Asignacion3D {
    constructor(Identificador, Valor, fila, columna) {
        this.Identificador = Identificador;
        this.Valor = Valor;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = this.Valor.Ejecutar(tabla);
        tabla.InsertUpdate(this.Identificador.Nombre, value);
        return null;
    }

    getOptimizacion() {
        let codigo = '';
        codigo += '=,' + this.Valor.getOptimizacion() + ',,' + this.Identificador.Nombre + '\n';
        return codigo;
    }
}