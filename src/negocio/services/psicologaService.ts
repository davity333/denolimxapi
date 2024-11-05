import { PsicologaRepository } from "../../persistencia/repositorios/PsicologaRepository";
import { Psicologa } from "../../persistencia/models/Psicologa";

export class PsicologaService{
    constructor(readonly psicologaRepository: PsicologaRepository){}

    async getAllPsicologa(): Promise<Psicologa[] | null> {
        return this.psicologaRepository.getAllPsicologa()
    }

    async getId(nombre:string):Promise<Psicologa | null> {
        return this.psicologaRepository.getId(nombre);
    }

    async createNewPsicologa(data:any): Promise<Psicologa | null> {
        return this.psicologaRepository.createNewPsicologa(data);
    }

    async updatePsicologa(id:number, data:any): Promise<Psicologa | null> {
        return this.psicologaRepository.updatePsicologa(id,data);
    }

    async updatePsicologaPartial(id:number,data:any): Promise<Psicologa | null> {
        return this.psicologaRepository.updatePsicologaPartial(id,data);    
    }
    async deletePsicologa(id:number): Promise<Psicologa | null> {
        return this.psicologaRepository.deletePsicologa(id);
    }
}