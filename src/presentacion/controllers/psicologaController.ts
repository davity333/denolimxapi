import { Request, Response } from "express";
import { UserService } from "../../negocio/services/usersService";
import { PsicologaService } from "../../negocio/services/psicologaService";

export class PsicologaController{
    constructor(readonly psicologaService: PsicologaService) {}

    async getAll(req: Request, res: Response) {
        const users = await this.psicologaService.getAllPsicologa();
        res.header("Access-Control-Expose-Headers","Authorization")
    
        res.status(200).send(users);
    }

    async getId(req: Request, res: Response) {
        let nombre = req.params.nombre;
        console.log(nombre);
        
        const psicologa = await this.psicologaService.getId(nombre);
        res.status(200).send({ status: "OK", data: psicologa });
    }

    async createNewPsicologa(req: Request, res: Response) {
        const data = req.body;
        const newUSer = await this.psicologaService.createNewPsicologa(data);
        res.status(200).send({ status: "OK", data: newUSer });
    }

    async updatePsicologa(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        console.log(id);
        
        const data = req.body;
        const updateUser = await this.psicologaService.updatePsicologa(id, data);
        res.status(200).send({ status: "OK", data: updateUser });
    }

    async updatePsicologaPartial(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updateUser = await this.psicologaService.updatePsicologaPartial(id, data);
        res.status(200).send({ status: "OK", data: updateUser });
    }
    async deletePsicologa(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const deleteUser = await this.psicologaService.deletePsicologa(id);
        res.status(200).send({ status: "OK", data: deleteUser });
    }
}