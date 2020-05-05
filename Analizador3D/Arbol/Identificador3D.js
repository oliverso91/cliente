class Identificador3D {
    constructor(Nombre, fila, columna) {
        this.Nombre = Nombre;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = tabla.getItem(this.Nombre);
        return value;
    }

    getOptimizacion() {
        let codigo = '';
        codigo += this.Nombre;
        return codigo;
    }
}