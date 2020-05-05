class Operacion3D {
    constructor(Operador, Valor1, Valor2, Resultado, fila, columna) {
        this.Operador = Operador;
        this.Valor1 = Valor1;
        this.Valor2 = Valor2;
        this.Resultado = Resultado;
        this.fila = fila;
        this.columna = columna;
    }

    Ejecutar(tabla) {
        let op1 = this.Valor1.Ejecutar(tabla);
        let op2 = this.Valor2.Ejecutar(tabla);
        if (this.Operador.toLowerCase() == "+") {
            tabla.InsertUpdate(this.Resultado.Nombre, op1 + op2);
        } else if (this.Operador.toLowerCase() == "-") {
            tabla.InsertUpdate(this.Resultado.Nombre, op1 - op2);
        } else if (this.Operador.toLowerCase() == "*") {
            tabla.InsertUpdate(this.Resultado.Nombre, op1 * op2);
        } else if (this.Operador.toLowerCase() == "/") {
            tabla.InsertUpdate(this.Resultado.Nombre, op1 / op2);
        } else { // %
            tabla.InsertUpdate(this.Resultado.Nombre, op1 % op2);
        }
    }

    getOptimizacion() {
        let codigo = '';
        let op1 = this.Valor1.getOptimizacion();
        let op2 = this.Valor2.getOptimizacion();
        let dir = this.Resultado.getOptimizacion();
        if (this.Operador.toLowerCase() == "+") {
            codigo += '+,' + op1 + ',' + op2 + ',' + dir + '\n';
        } else if (this.Operador.toLowerCase() == "-") {
            codigo += '-,' + op1 + ',' + op2 + ',' + dir + '\n';
        } else if (this.Operador.toLowerCase() == "*") {
            codigo += '*,' + op1 + ',' + op2 + ',' + dir + '\n';
        } else if (this.Operador.toLowerCase() == "/") {
            codigo += '/,' + op1 + ',' + op2 + ',' + dir + '\n';
        } else { // %
            codigo += '%,' + op1 + ',' + op2 + ',' + dir + '\n';
        }
        return codigo;
    }
}