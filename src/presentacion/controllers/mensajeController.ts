import { Request, Response } from "express";
import { MensajeService } from "../../negocio/services/mensajesService";

export class MensajeController{
    constructor(readonly mensajeService: MensajeService) {}
    
    async getAllMessage(req: Request, res: Response) {
        const users = await this.mensajeService.getAllMessage();
        res.header("Access-Control-Expose-Headers","Authorization")
    
        res.status(200).send(users);
    }


    async getMessage(req: Request, res: Response) {
        let codigo = parseInt(req.params.codigo);
        console.log(codigo);
        
        const mensaje = await this.mensajeService.getMessage(codigo);
        res.status(200).send(mensaje );
    }

    async createMessage(req: Request, res: Response) {
        const data = req.body;
        const newUSer = await this.mensajeService.createMessage(data);
        res.status(200).send({ status: "OK", data: newUSer });
    }

    async updateMessage(req: Request, res: Response) {
        const id = parseInt(req.params.codigo);
        console.log(id);
        
        const data = req.body;
        const updateUser = await this.mensajeService.updateMessage(id, data);
        res.status(200).send({ status: "OK", data: updateUser });
    }

}