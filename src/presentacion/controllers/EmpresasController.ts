import { Request, Response } from "express";
import { EmpresaService } from "../../negocio/services/empresaService";

export class EmpresasController{
    constructor(readonly empresaService: EmpresaService){}

    async getAll(req: Request, res: Response) {
        const empresas = await this.empresaService.getAllEmpresas();
        res.header("Access-Control-Expose-Headers","Authorization")
        res.status(200).send({ status: true, data: empresas });
    }

    async getNombre(req: Request, res: Response) {
        let nombre = req.params.idEmpresa;
        const empresa = await this.empresaService.getNombre(nombre);
        res.status(200).send({ status: "OK", data: empresa });
    }

    async createNewEmpresa(req: Request, res: Response) {
        const data = req.body;
        const newEmpresa = await this.empresaService.createNewEmpresa(data);
        res.status(200).send({ status: "Agregado", data: newEmpresa });
    }

    async updateEmpresa(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updateEmpresa = await this.empresaService.updateEmpresa(id, data);
        res.status(200).send({ status: "OK", data: updateEmpresa });
    }

    async updateEmpresaPartial(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updateEmpresa = await this.empresaService.updateEmpresaPartial(id, data);
        res.status(200).send({ status: "OK", data: updateEmpresa });
    }
    async deleteEmpresa(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const deleteEmpresa = await this.empresaService.deleteEmpresa(id);
        res.status(200).send({ status: "OK", data: deleteEmpresa});
    }

}