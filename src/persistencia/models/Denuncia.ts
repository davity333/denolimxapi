export class Denuncia {
    private idDenuncia: number;
    private ubicacion: string | null;
    private descripcion: string | null;
    private lugar: string | null;
    private fecha: string;
    private evidencia: string |null;
    private tipoDenuncia: string;
    private codigo: number;
    
    constructor(idDenuncia:number, ubicacion:string, descripcion: string, lugar:string, fecha:string, evidencia:string, tipoDenuncua:string, codigo:number){
        this.idDenuncia = idDenuncia;
        this.ubicacion = ubicacion;
        this.descripcion = descripcion;
        this.lugar = lugar;
        this.fecha = fecha;
        this.evidencia = evidencia || null;
        this.tipoDenuncia = tipoDenuncua;
        this.codigo = codigo;
    }
}