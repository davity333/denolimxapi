import dotenv from 'dotenv'
import mysql from 'mysql2/promise';
import { Psicologa } from '../models/Psicologa';
export class PsicologaRepository{
    private connection: mysql.Pool;

    constructor() { 
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
        });       
    }

    async getAllPsicologa(): Promise<Psicologa[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM psicologa');   
        return rows as Psicologa[];
    }

    async getId(nombre:string): Promise<Psicologa | null> {        
        try {
            const [rows]:any = await this.connection.execute('SELECT * FROM psicologa WHERE nombre=?',[nombre]);
            return new Psicologa(
                rows[0].idpsicologa,
                rows[0].nombre,
                rows[0].apellido,
                rows[0].aniosExperiencia,
                rows[0].especialidad,
                rows[0].telefono,
                rows[0].email,
            );
        } catch (error) {
            return null;
        }       
    }

    async createNewPsicologa(data:any): Promise<Psicologa | null> {
        let user = null
        try {
            const [result]:any = await this.connection.execute('INSERT INTO psicologa (nombre, apellido, aniosExperiencia, especialidad, telefono, email) VALUES (?, ?, ?, ?, ?, ?)',
                [data.nombre, data.apellido, data.aniosExperiencia, data.especialidad, data.telefono, data.email]);
            return new Psicologa(result.idpsicologa, data.nombre, data.apellido, data.aniosExperiencia, data.especialidad, data.telefono, data.email) 
        }
        catch(error){
            return null
        }
    }


    async updatePsicologa(id:number, data:any): Promise<Psicologa | null> {        
        try {
            const [result] = await this.connection.execute('UPDATE psicologa SET nombre=?, apellido=?, aniosExperiencia=?, especialidad=?, telefono=?, email=? WHERE idpsicologa=?',
                [data.nombre, data.apellido, data.aniosExperiencia, data.especialidad, data.telefono, data.email, id]);
            return new Psicologa(id, data.nombre, data.apellido, data.aniosExperiencia, data.especialidad, data.telefono, data.email) 
        }
        catch(error){            
            return null
        }   
    }


    async updatePsicologaPartial(id:number,data:any): Promise<Psicologa | null> {
        const [rows] = await this.connection.execute('UPDATE INTO psicologa (nombre, apellido, aniosExperiencia, especialidad, telefono, email) VALUES (?, ?, ?, ?, ?, ?)',
            [data.nombre, data.apellido, data.aniosExperiencia, data.especialidad, data.telefono, data.email, id]);
        return null;
    }


    async deletePsicologa(id:number): Promise<any | null> {
        try {
            const [result] = await this.connection.execute('delete from psicologa where idpsicologa=?',[id]);
            return {status: true} 
        }
        catch(error){            
            return null
        }  
    }
}