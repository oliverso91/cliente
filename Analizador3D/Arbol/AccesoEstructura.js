class AccesoEstructura {
    constructor(Estructura, Direccion, Memoria, fila, columna) {
        this.Estructura = Estructura;
        this.Direccion = Direccion;
        this.Memoria = Memoria;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let dir = this.Direccion.Ejecutar(tabla);
        let mem = this.Memoria.Nombre;
        let value;
        if (this.Estructura.toLowerCase() == "stack") {
            value = tabla.getStack(dir)
        } else {
            value = tabla.getHeap(dir);
        }
        tabla.InsertUpdate(mem, value);
        return null;
    }

    getOptimizacion() {
        let codigo = '';
        codigo += '=,' + this.Estructura + ',' + this.Direccion.getOptimizacion() + ',' + this.Memoria.Nombre + '\n';
        return codigo;
    }
}