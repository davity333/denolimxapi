import express, { Router } from 'express';
import { EmpresaService } from '../../negocio/services/empresaService';
import { EmpresaRepository } from '../../persistencia/repositorios/EmpresasRepository';
import { EmpresasController } from '../controllers/EmpresasController';

export const empresaRoutes: Router = express.Router();
const empresaRepository = new EmpresaRepository();
const empresaService = new EmpresaService(empresaRepository);
const empresasController = new EmpresasController(empresaService);

empresaRoutes.get("/:all", empresasController.getAll.bind(empresasController));
empresaRoutes.get("/:name", empresasController.getNombre.bind(empresasController));
empresaRoutes.post("/", empresasController.createNewEmpresa.bind(empresasController));
empresaRoutes.put("/:update", empresasController.updateEmpresa.bind(empresasController));
empresaRoutes.patch("/:updatePartial", empresasController.updateEmpresaPartial.bind(empresasController));
empresaRoutes.delete("/:deleted", empresasController.deleteEmpresa.bind(empresasController));