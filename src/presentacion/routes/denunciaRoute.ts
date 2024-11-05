import express, { Router } from 'express';
import { DenunciaRepository } from '../../persistencia/repositorios/DenunciasRepository';
import { DenunciasService } from '../../negocio/services/denunciasService';
import { DenunciasController } from '../controllers/denunciasController';

export const denunciasRoutes: Router = express.Router();
const denunciasRepository = new DenunciaRepository();
const denunciasService = new DenunciasService(denunciasRepository);
const denunciasController = new DenunciasController(denunciasService);

//Endpoints del recurso users
denunciasRoutes.get("/", denunciasController.getAll.bind(denunciasController));
denunciasRoutes.post("/", denunciasController.createNewDenuncia.bind(denunciasController));
denunciasRoutes.get("/denuncias", denunciasController.getStatistics.bind(denunciasController));