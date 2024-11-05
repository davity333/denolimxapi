import express, { Router } from 'express';
import { PsicologaRepository } from '../../persistencia/repositorios/PsicologaRepository';
import { PsicologaService } from '../../negocio/services/psicologaService';
import { PsicologaController } from '../controllers/psicologaController';

export const psicologaRoutes: Router = express.Router();
const psicologaRepository = new PsicologaRepository();
const psicologaService = new PsicologaService(psicologaRepository);
const psicologaController = new PsicologaController(psicologaService);

psicologaRoutes.get("/all", psicologaController.getAll.bind(psicologaController));
psicologaRoutes.get("/:nombre", psicologaController.getId.bind(psicologaController));
psicologaRoutes.post("/", psicologaController.createNewPsicologa.bind(psicologaController));
psicologaRoutes.put("/:id", psicologaController.updatePsicologa.bind(psicologaController));
psicologaRoutes.patch("/:id", psicologaController.updatePsicologaPartial.bind(psicologaController));
psicologaRoutes.delete("/:id", psicologaController.deletePsicologa.bind(psicologaController));