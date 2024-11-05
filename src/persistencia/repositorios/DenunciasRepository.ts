import dotenv from 'dotenv'
import mysql from 'mysql2/promise';
import { Denuncia } from './../models/Denuncia';

dotenv.config();

export class DenunciaRepository{
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

    //OBTENER DENUNCIAS
    async getAllDenuncias(): Promise<Denuncia[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM denuncia');   
        return rows as Denuncia[];
    }

    //CREAR DENUNCIA
    async createNewDenuncia(data:any): Promise<Denuncia | null> {
        let denuncia = null

        try {
            const [result]:any = await this.connection.execute('insert into denuncia (ubicacion, descripcion, lugarDemandar, fecha, evidencia, tipoDenuncia, codigo) values (?, ?, ?, ?, ?, ?, ?)',
                [data.ubicacion, data.descripcion, data.lugarDemandar, data.fecha, data.evidencia, data.tipoDenuncia, data.codigo]);
            return new Denuncia(result.idDenuncia, data.ubicacion, data.descripcion, data.lugarDemandar, data.fecha, data.evidencia || null , data.tipoDenuncia, data.codigo) 
        }
        catch(error){
            return null
        }
    }

    // OBTENER ESTADISTICAS
async getStatistics(): Promise<{ tipoDenuncia: string; count: number; percentage: number }[] | null> {
    const query = `
    SELECT tipoDenuncia, 
    COUNT(*) as count, 
    FLOOR((COUNT(*) / (SELECT COUNT(*) FROM denuncia) * 100)) as percentage
    FROM denuncia 
    GROUP BY tipoDenuncia 
    ORDER BY count DESC 
    LIMIT 3;
        `;
        const [rows]: any = await this.connection.execute(query);
    return rows.map((row: any) => ({
        tipoDenuncia: row.tipoDenuncia,
        count: row.count,
        percentage: row.percentage
    }))
}

    //ELIMINAR DENUNCIA
async deleteDenuncia(id:number): Promise<any | null> {
    try {
        const [result] = await this.connection.execute('DELETE FROM denuncia WHERE id=?',[id]);
        return {status: true} 
    }
    catch(error){            
        return null
    }  
}

}