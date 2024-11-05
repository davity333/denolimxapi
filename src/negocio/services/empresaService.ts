import { EmpresaRepository } from "../../persistencia/repositorios/EmpresasRepository";
import { Empresa } from "../../persistencia/models/Empresa";

export class EmpresaService{
    constructor(readonly empresaRepository: EmpresaRepository){}

    async getAllEmpresas(): Promise<Empresa[] | null> {
        return this.empresaRepository.getAllEmpresas()
    }

    async getNombre(nombre:string):Promise<Empresa | null> {
        return this.empresaRepository.getNombre(nombre);
    }

    async getId(id:number):Promise<Empresa | null> {
        return this.empresaRepository.getId(id);
    }

    async createNewEmpresa(data:any): Promise<Empresa | null> {
        return this.empresaRepository.createEmpresa(data);
    }

    async updateEmpresa(id:number, data:any): Promise<Empresa | null> {
        return this.empresaRepository.updateEmpresa(id,data);
    }

    async updateEmpresaPartial(id:number,data:any): Promise<Empresa | null> {
        return this.empresaRepository.updateEmpresaPartial(id,data);    
    }
    async deleteEmpresa(id:number): Promise<Empresa | null> {
        return this.empresaRepository.deleteEmpresa(id);
    }
}