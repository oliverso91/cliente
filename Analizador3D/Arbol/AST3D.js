class AST3D {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.asignarIndex();
    }
    asignarIndex() {
        let i = 0;
        this.instrucciones.map(m => {
            m.index = i++;
        });
    }
}