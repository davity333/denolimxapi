import dotenv from 'dotenv'
import mysql from 'mysql2/promise';
import { User } from '../models/User';
import { createHash, randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
dotenv.config();

export class UserRepository {
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

    async getAllUsers(): Promise<User[] | null> {
        const [rows] = await this.connection.execute('SELECT * FROM user');   
        return rows as User[];
    }

    async getId(email:string): Promise<User | null> {        
        try {
            const [rows]:any = await this.connection.execute('SELECT idUser FROM user WHERE email=?',[email]);
            console.log("ID ES. "+rows[0]?.idUser);
            return new User(
                rows[0].idUser,
                rows[0].nombre,
                rows[0].apellido,
                rows[0].email,
                rows[0].password,
                

            );
        } catch (error) {
            return null;
        }       
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        try {
            const [rows]: any = await this.connection.execute(
                'SELECT * FROM user WHERE email = ?',
                [email] 
            );
            console.log('user:', rows);

            if (rows.length === 0) {
                return null; 
            }
    
            const user = rows[0]; 
            let flag = false;
            if(password === user.password){
                flag = true;
            }
            if (!flag) {
                return null; 
            }
    
            return new User(user.id, user.nombre, user.apellido, user.email, user.password);
        } catch (error) {
            console.error('Error validating user:', error);
            return null; 
        }
    }
    
    
    async createNewUser(data:any): Promise<User | null> {
        let user = null
        
        try {
            const [result]: any = await this.connection.execute(
                'INSERT INTO user (nombre, apellido, email, password) VALUES (?, ?, ?, ?)',
                [data.nombre, data.apellido, data.email, data.password]
            );
            return new User(result.insertId, data.nombre, data.apellido, data.email, data.password);
        } catch (error) {
            return null;
        }
    }

    
    async updateUser(id:number, data:any): Promise<User | null> {        
        try {
            console.log(data);
            const [result] = await this.connection.execute('UPDATE user SET nombre=?, apellido=?, email=?, password=? WHERE idUser=?',
                [data.nombre,data.apellido,data.email,data.password,id]);
            return new User(id, data.nombre, data.apellido, data.email, data.password) 
        }
        catch(error){            
            return null
        }   
    }

    async updateUserPartial(id:number,data:any): Promise<User | null> {
        const [rows] = await this.connection.execute('UPDATE INTO user (nombre, apellido, email, password) VALUES (?, ?, ?, ?)'[id],
            [data.name,data.lastName]);
        return null;
    }


    async deleteUser(id:number): Promise<any | null> {
        try {
            const [result] = await this.connection.execute('DELETE FROM user WHERE idUser=?',[id]);
            return {status: true} 
        }
        catch(error){            
            return null
        }  
    }
}