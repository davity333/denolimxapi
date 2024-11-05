export class Mensaje{
    private idmensaje: number;
    private nombreAutoridad: string;
    private mensaje: string;
    private codigo: number;

    constructor(idmensaje: number, mensaje: string, codigo: number, nombreAutoridad: string){
        this.idmensaje = idmensaje;
        this.nombreAutoridad = nombreAutoridad;
        this.mensaje = mensaje;
        this.codigo = codigo;
    }
}

