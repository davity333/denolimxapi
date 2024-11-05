import express, { Router } from 'express';
import { MensajeService } from '../../negocio/services/mensajesService';
import { MensajeRepository } from '../../persistencia/repositorios/MensajeRepository';
import { MensajeController } from '../controllers/mensajeController';

export const mensajeRoute: Router = express.Router();
const mensajeRepository = new MensajeRepository();
const mensajeService = new MensajeService(mensajeRepository);
const mensajeController = new MensajeController(mensajeService);

mensajeRoute.get("/all", mensajeController.getAllMessage.bind(mensajeController));
mensajeRoute.get("/:codigo", mensajeController.getMessage.bind(mensajeController));
mensajeRoute.post("/", mensajeController.createMessage.bind(mensajeController));
mensajeRoute.put("/:codigo", mensajeController.updateMessage.bind(mensajeController));