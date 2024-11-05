import dotenv from 'dotenv'
import mysql from 'mysql2/promise';
import { Empresa } from '../models/Empresa';

dotenv.config();

export class EmpresaRepository{
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

    async getAllEmpresas(): Promise<Empresa[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM empresa;');   
        return rows as Empresa[];
    }

    async getId(id:number): Promise<Empresa | null> {        
        try {
            const [rows]:any = await this.connection.execute('SELECT * FROM empresa WHERE idUser=?',[id]);
            return new Empresa(
                rows[0].idempresa,
                rows[0].nombreEmpresa,
                rows[0].nombreDueño,
                rows[0].ubicacion,
                rows[0].cp,
                rows[0].horario,
                rows[0].imagen,
                rows[0].user_idUser 
            );
        } catch (error) {
            return null;
        }       
    }

    async getNombre(nombre:string): Promise<Empresa | null> {        
        try {
            const [rows]:any = await this.connection.execute('SELECT * FROM empresa WHERE nombre=?',[nombre]);
            return new Empresa(
                rows[0].idempresa,
                rows[0].nombreEmpresa,
                rows[0].nombreDueño,
                rows[0].ubicacion,
                rows[0].cp,
                rows[0].horario,
                rows[0].imagen,
                rows[0].user_idUser 
            );
        } catch (error) {
            return null;
        }       
    }

    async createEmpresa(data: any): Promise<Empresa | null> {
        try {
            const [result]: any = await this.connection.execute(
                'INSERT INTO empresa (nombreEmpresa, nombreDuenio, ubicacion, cp, horario, imagen, user_idUser) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [data.nombreEmpresa, data.nombreDueno, data.ubicacion, data.cp, data.horario, data.imagen || null,data.user_idUser]
            );

            const idEmpresa = result.insertId; 
            return new Empresa(idEmpresa, data.nombreEmpresa, data.nombreDueno, data.ubicacion, data.cp, data.horario, data.imagen, data.user_idUser);
        } catch (error) {
            console.error('Error al crear empresa:', error);
            return null;
        }
    }

    async updateEmpresa(id:number, data:any): Promise<Empresa | null> {        
        try {
            const [result] = await this.connection.execute('UPDATE empresa SET nombreEmpresa=?, nombreDueno=?, ubicacion=?, cp=?, horario=?, imagen=? WHERE id=?',
                [data.nombreEmpresa. data.nombreDueno, data.ubicacion, data.cp, data.horario, data.imagen, id]);
            return new Empresa(id, data.nombreEmpresa, data.nombreDueno, data.ubicacion, data.cp, data.horario, data.imagen, data.user_idUser) 
        }
        catch(error){            
            return null
        }   
    }

    async updateEmpresaPartial(id:number,data:any): Promise<Empresa | null> {
        const [rows] = await this.connection.execute('UPDATE INTO empresa (nombreEmpresa, nombreDueno, ubicacion, cp, horario, imagen) VALUES (?, ?, ?, ?, ?, ?)',
            [data.nombreEmpresa, data.nombreDueno, data.ubicacion, data.cp, data.horario, data.imagen]);
        return null;
    }

    async deleteEmpresa(id:number): Promise<any | null> {
        try {
            const [result] = await this.connection.execute('DELETE FROM empresa WHERE id=?',[id]);
            return {status: true} 
        }
        catch(error){            
            return null
        }  
    }
}