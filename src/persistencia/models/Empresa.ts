export class Empresa {
    private idEmpresa: number;
    private nombreEmpresa: string;
    private nombreDueno: string;
    private ubicacion: string;
    private cp: string;
    private horario: string;
    private imagen: string | null;
    private user_idUser: number
    constructor(idEmpresa:number, nombreEmpresa:string, nombreDueno:string, ubicacion:string, cp:string, horario:string, imagen:string, user_idUser:number){
        this.idEmpresa = idEmpresa;
        this.nombreEmpresa = nombreEmpresa;
        this.nombreDueno = nombreDueno;
        this.ubicacion = ubicacion;
        this.cp = cp;
        this.horario = horario;
        this.imagen = imagen;
        this.user_idUser = user_idUser;
    }
}
