class Print3D {
    constructor(Parametro, Valor, fila, columna) {
        this.Parametro = Parametro;
        this.Valor = Valor;
        this.fila = fila;
        this.columna = columna;
        this.assembler = '';
    }
    Ejecutar(tabla) {
        let value = this.Valor.Ejecutar(tabla);
        if (this.Parametro.toLowerCase() == "%c") {
            console.log(value);
            document.getElementById("consola").value += String.fromCharCode(value);
        } else if (this.Parametro.toLowerCase() == "%d") {
            document.getElementById("consola").value += parseFloat(value + "").toFixed(2);
        } else {
            document.getElementById("consola").value += parseInt(value + "", 10);
        }
        return null;
    }

    getOptimizacion() {
        let codigo = '';
        if (this.Parametro.toLowerCase() == "%c") {
            codigo += 'print(%c,' + this.Valor.getOptimizacion() + ')\n';
        } else if (this.Parametro.toLowerCase() == "%d") {
            codigo += 'print(%d,' + this.Valor.getOptimizacion() + ')\n';
        } else {
            codigo += 'print(%e,' + this.Valor.getOptimizacion() + ')\n';
        }
        return codigo;
    }
}