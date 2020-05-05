class IniciarMetodo {
    constructor(Identificador, cantidadIns, fila, columna) {
        this.Identificador = Identificador;
        this.cantidadIns = cantidadIns;
        this.getValor = false;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let value = this.index;
        if (this.getValor) {
            return tabla.getItem(this.Identificador);
        } else {
            tabla.InsertUpdate(this.Identificador, value);
        }
        return null;
    }

    getOptimizacion() {
        let codigo = '';
        codigo += 'begin,,,' + this.Identificador + '\n';
        return codigo;
    }
}