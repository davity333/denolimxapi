export class User {
    private idUser: number;
    private nombre: string;
    private apellido: string;
    private email: string;
    private password: string;

    constructor(idUser:number, nombre:string, apellido: string, email:string, password:string){
        this.idUser = idUser;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
    }
}
