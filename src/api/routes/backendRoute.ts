import express from "express";
const backendRouter = express.Router();

import { RegistarFuncoesController } from "../controllers/backend/registarFuncoesController";
import { RegistarCpController } from "../controllers/backend/registarCpController";
import { CriarAtividadeController } from "../controllers/atividades/criarAtividadeController";
// import { RemoverMarcaService } from "../services/marcas/removerMarcaService";
import { RemoverAtividadesController } from "../controllers/atividades/removerAtividadesController";
import { EditarAtividadesController } from "../controllers/atividades/editarAtividadesController";
import { VerTodasAtividadesController } from "../controllers/atividades/verTodasAtividadesController";
import { EditarMusculoController } from "../controllers/musculos/editarMusculoController";
import { AddMusculoController } from "../controllers/musculos/addMusculoController";


const registarFuncoesController = new RegistarFuncoesController();
const registarCpController = new RegistarCpController();
const criarAtividadeController = new CriarAtividadeController();
const removerAtividadesController = new RemoverAtividadesController();
const editarAtividadesController = new EditarAtividadesController();


const editarMusculoController = new EditarMusculoController();
const addMusculoController = new AddMusculoController();

backendRouter.post("/funcoes/", registarFuncoesController.handle);
backendRouter.post("/cp/", registarCpController.handle);

backendRouter.post("/atividades/", criarAtividadeController.handle);
backendRouter.delete("/atividades/:id", removerAtividadesController.handle);
backendRouter.put("/atividades/:id", editarAtividadesController.handle);


backendRouter.put("/musculos/:musculoId", editarMusculoController.handle);
backendRouter.post("/musculos", addMusculoController.handle);
export { backendRouter };

