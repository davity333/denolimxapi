import dotenv from 'dotenv'
import mysql from 'mysql2/promise';
import { Mensaje } from '../models/Mensaje';

export class MensajeRepository{
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

    async getAllMessages(): Promise<Mensaje[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM mensaje');   
        return rows as Mensaje[];
    }

    async getMessage(codigo:number): Promise<Mensaje | null> {        
        try {
            const [rows]:any = await this.connection.execute('select*from mensaje where codigo = ?',[codigo]);
            return new Mensaje(
                rows[0].idmensaje,
                rows[0].nombreAutoridad,
                rows[0].codigo,
                rows[0].mensaje,
            );
        } catch (error) {
            return null;
        }       
    }

    async createMessage(data:any): Promise<Mensaje | null> {
        let denuncia = null

        try {
            const [result]:any = await this.connection.execute('insert into mensaje (nombreAutoridad, mensaje, codigo) values (?, ?, ?)',
                [data.nombreAutoridad, data.mensaje, data.codigo]);
            return new Mensaje(result.idmensaje, data.nombreAutoridad, data.mensaje, data.codigo) 
        }
        catch(error){
            return null
        }
    }

    async updateMessage(codigo: number, data: any): Promise<Mensaje | null> {
        try {
            const [rows] = await this.connection.execute(
                'UPDATE mensaje SET nombreAutoridad=?, mensaje=? WHERE codigo=?',
                [data.nombreAutoridad, data.mensaje, codigo]
            );
            return new Mensaje(codigo, data.nombreAutoridad, codigo, data.mensaje);
        } catch (error) {
            return null; 
        }
    }
    
}