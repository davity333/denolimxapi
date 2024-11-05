import { MensajeRepository } from "../../persistencia/repositorios/MensajeRepository";
import { Mensaje } from "../../persistencia/models/Mensaje";

export class MensajeService{
    constructor(readonly mensageRepository: MensajeRepository){}

    async getAllMessage(): Promise<Mensaje[] | null> {
        return this.mensageRepository.getAllMessages()
    }

    async getMessage(codigo:number):Promise<Mensaje | null> {
        return this.mensageRepository.getMessage(codigo);
    }

    async createMessage(data:any): Promise<Mensaje | null> {
        return this.mensageRepository.createMessage(data);
    }

    async updateMessage(id:number, data:any): Promise<Mensaje | null> {
        return this.mensageRepository.updateMessage(id,data);
    }

}