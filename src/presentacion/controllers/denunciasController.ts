import { Request, Response } from "express";
import { DenunciasService } from "../../negocio/services/denunciasService";

export class DenunciasController {
    constructor(readonly denunciasService: DenunciasService) {}

    async getAll(req: Request, res: Response) {
        const denuncias = await this.denunciasService.getAllDenuncias();
        // users puede ser null o un arreglo de objetos
        //Este headers permite que el frontend pueda lear la cabecera Authorization
        res.header("Access-Control-Expose-Headers","Authorization")
        res.status(200).send(denuncias);
    }

    async createNewDenuncia(req: Request, res: Response) {
        const data = req.body;
        const newDenuncia = await this.denunciasService.createNewDenuncia(data);
        res.status(200).send({ status: "OK", data: newDenuncia });
    }

    async getStatistics(req: Request, res: Response) {
        const denuncias = await this.denunciasService.getStatistics();
        res.header("Access-Control-Expose-Headers","Authorization")
        res.status(200).send(denuncias);
    }

}