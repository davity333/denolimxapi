export class Psicologa {
    private idpsicologa: number;
    private nombre: string;
    private apellido: string ;
    private aniosExperiencia: number ;
    private especialidad: string ;
    private telefono: string;
    private email: string;

    constructor(idpsicologia:number, nombre:string, apellido:string, aniosExperiencia:number, especialidad:string, telefono:string, email:string){
        this.idpsicologa = idpsicologia;
        this.nombre = nombre;
        this.apellido = apellido;
        this.aniosExperiencia = aniosExperiencia;
        this.especialidad = especialidad;
        this.telefono = telefono;
        this.email = email;
    }
}