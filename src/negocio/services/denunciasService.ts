import { Denuncia } from "../../persistencia/models/Denuncia";
import { DenunciaRepository } from "../../persistencia/repositorios/DenunciasRepository";

export class DenunciasService{
    constructor(readonly denunciaRepositorio: DenunciaRepository){}

    async getAllDenuncias(): Promise<Denuncia[] | null> {
        return this.denunciaRepositorio.getAllDenuncias()
    }

    async createNewDenuncia(data:any): Promise<Denuncia | null> {
        return this.denunciaRepositorio.createNewDenuncia(data);
    }

    async getStatistics(): Promise<{ tipoDenuncia: string; count: number; percentage: number }[] | null> {
        return this.denunciaRepositorio.getStatistics()
    }
}