class SaltoCondicional {
    constructor(tipo, valor1, valor2, salto, fila, columna) {
        this.tipo = tipo;
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.salto = salto;
        this.fila = fila;
        this.columna = columna;
    }
    Ejecutar(tabla) {
        let cond1 = this.valor1.Ejecutar(tabla);
        let cond2 = this.valor2.Ejecutar(tabla);
        let value = tabla.getItem(this.salto);
        if (value == null || value == undefined) {
            value = -1;
        }
        if (this.tipo == "==") {
            if (cond1 == cond2) {
                return value;
            }
        } else if (this.tipo == "!=") {
            if (cond1 != cond2) {
                return value;
            }
        } else if (this.tipo == ">") {
            if (cond1 > cond2) {
                return value;
            }
        } else if (this.tipo == "<") {
            if (cond1 < cond2) {
                return value;
            }
        } else if (this.tipo == ">=") {
            if (cond1 >= cond2) {
                return value;
            }
        } // else if (this.tipo == "jle") {
        else {
            if (cond1 <= cond2) {
                return value;
            }
        }
        return -1;
    }

    getOptimizacion() {
        let cond1 = this.valor1.getOptimizacion();
        let cond2 = this.valor2.getOptimizacion();
        let value = this.salto;
        let codigo = '';
        if (this.tipo.toLowerCase() == "je") {
            codigo += 'je,' + cond1 + ',' + cond2 + ',' + value + '\n';
        } else if (this.tipo.toLowerCase() == "jne") {
            codigo += 'jne,' + cond1 + ',' + cond2 + ',' + value + '\n';
        } else if (this.tipo.toLowerCase() == "jg") {
            codigo += 'jg,' + cond1 + ',' + cond2 + ',' + value + '\n';
        } else if (this.tipo.toLowerCase() == "jl") {
            codigo += 'jl,' + cond1 + ',' + cond2 + ',' + value + '\n';
        } else if (this.tipo.toLowerCase() == "jge") {
            codigo += 'jge,' + cond1 + ',' + cond2 + ',' + value + '\n';
        } // else if (this.tipo.toLowerCase() == "jle") {
        else {
            codigo += 'jle,' + cond1 + ',' + cond2 + ',' + value + '\n';
        }
        return codigo;
    }
}