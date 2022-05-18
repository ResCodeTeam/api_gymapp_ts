import express from "express";
const adminRouter = express.Router();

//middlewares
//import verificarAutenticacao from "../middlewares/verificarAutenticacao";

//import { CriarNotificacaoUserController } from "../controllers/admin/notificacoes/criarNotificacaoUserController";
import { RegistarUserMarcasController } from "../controllers/marcas/registarUserMarcasController";
import { RegistarMarcaGinasiosController } from "../controllers/ginasios/registarMarcaGinasiosController";
import { CriarGinasioModalidadesController } from "../controllers/modalidades/criarGinasioModalidadesController";
import { RemoverModalidadesController } from "../controllers/modalidades/removerModalidadesController";
import { EliminarTreinadorController } from "../controllers/treinadores/eliminarTreinadorController";


import { CriarNotificacaoMarcaController } from "../controllers/notificacoes/criarNotificacaoMarcaController";
import { CriarNotificacaoGinasioController } from "../controllers/notificacoes/criarNotificacaoGinasioController";
import { RegistarAlunoController } from "../controllers/alunos/registarAlunoController";
import { RegistarAdminController } from "../controllers/admin/registarAdminControllers";

import { RemoverMarcaController } from "../controllers/marcas/removerMarcaController";
import { RegistarTreinadorController } from "../controllers/treinadores/registarTreinadorController";
import { CriarNotificacaoUserController } from "../controllers/notificacoes/criarNotificacaoUserController";
import { EditarModalidadesController } from "../controllers/modalidades/editarModalidadeController";
import { EditarMarcaController } from "../controllers/marcas/editarMarcaController";
import { RemoverGinasioController } from "../controllers/ginasios/removerGinasioController";
import { VerUmGinasioController } from "../controllers/ginasios/verUmGinasioController";
import { VerTodosGinasiosController } from "../controllers/ginasios/verTodosGinasiosController";
import { VerUmaMarcaController } from "../controllers/marcas/verUmaMarcaController";
import { VerTodasMarcasController } from "../controllers/marcas/verTodasMarcasController";
import { VerTodasModalidadesController } from "../controllers/modalidades/verTodasModalidadesController";
import { EditarGinasioController } from "../controllers/ginasios/editarGinasioController";
import { RemoverAlunoController } from "../controllers/alunos/removerAlunoController";
import { VerTreinadorGinasioController } from "../controllers/ginasios/obterTreinadorGinasioController";
import { CriarLocalMedidaController } from "../controllers/localMedida/criarLocalMedidaController";
import { RemoverLocalMedidaController } from "../controllers/localMedida/removerLocalMedidaController";



const registarAlunosController = new RegistarAlunoController();
const registarUserMarcasController = new RegistarUserMarcasController();
const registarMarcaGinasiosController = new RegistarMarcaGinasiosController();
const criarGinasioModalidadesController = new CriarGinasioModalidadesController();
const removerModalidadesController = new RemoverModalidadesController();
const eliminarTreinadorController = new EliminarTreinadorController();
const editarModalidadesController = new EditarModalidadesController();
const editarMarcaController = new EditarMarcaController();
const removerMarcaController = new RemoverMarcaController();
const registarTreinadorController = new RegistarTreinadorController();
const removerGinasioController = new RemoverGinasioController();
const verUmGinasioController = new VerUmGinasioController();
const verTodosGinasiosController = new VerTodosGinasiosController();
const verUmaMarcaController = new VerUmaMarcaController();
const verTodasMarcasController = new VerTodasMarcasController();
const verTodasModalidadesController = new VerTodasModalidadesController();
const editarGinasioController = new EditarGinasioController();
const removerAlunoController = new RemoverAlunoController();
const verTreinadorGinasioController = new VerTreinadorGinasioController();
const criarLocalMedidaController = new CriarLocalMedidaController();
const removerLocalMedidaController = new RemoverLocalMedidaController();
const criarNotificacaoMarcaController = new CriarNotificacaoMarcaController();
const criarNotificacaoGinasioController = new CriarNotificacaoGinasioController();
const criarNotificacaoUserController = new CriarNotificacaoUserController();

//#region Alunos
adminRouter.post("/:adminId/marca/alunos/", registarAlunosController.handle);
adminRouter.delete("/:adminId/aluno/remover/:uId", removerAlunoController.handle);
//#endregion

//#region Ginasios
adminRouter.post("/:adminId/marca/:id/ginasio/", registarMarcaGinasiosController.handle);
adminRouter.delete("/:adminId/ginasio/:id/", removerGinasioController.handle);
adminRouter.get("/:adminId/ginasio/:id/", verUmGinasioController.handle);
adminRouter.get("/:adminId/marca/:id/ginasio/", verTodosGinasiosController.handle);
adminRouter.put("/:adminId/ginasio/editar/:ginasioId", editarGinasioController.handle);
adminRouter.get("/:adminId/ginasio/treinador/ver/:id", verTreinadorGinasioController.handle);
//#endregion

//#region Marcastreinador
adminRouter.post("/:adminId/marca/", registarUserMarcasController.handle);
adminRouter.delete("/:adminId/marca/:id", removerMarcaController.handle);
adminRouter.get("/:adminId/marca/:id/", verUmaMarcaController.handle);
adminRouter.get("/:adminId/marca/", verTodasMarcasController.handle);
adminRouter.put("/:adminId/marca/:marcaId", editarMarcaController.handle);
//#endregion

//#region Modalidades
adminRouter.post("/:adminId/ginasio/:id/modalidades", criarGinasioModalidadesController.handle);
adminRouter.delete("/:adminId/ginasio/:ginasioId/modalidades/:id", removerModalidadesController.handle);
adminRouter.put("/:adminId/ginasio/:ginasioId/modalidades/:id", editarModalidadesController.handle);
adminRouter.get("/:adminId/ginasio/:id/modalidades/", verTodasModalidadesController.handle);
//#endregion

//#region Notificacoes
adminRouter.post("/:adminId/notificacao/user/:id", criarNotificacaoUserController.handle);
adminRouter.post("/:adminId/notificacao/marca/:marcaId", criarNotificacaoMarcaController.handle);
adminRouter.post("/:adminId/notificacao/ginasio/:ginasioId", criarNotificacaoGinasioController.handle);
//#endregion

//#region Treinadores
adminRouter.delete("/:adminId/treinador/:id", eliminarTreinadorController.handle);
adminRouter.post("/:adminId/marca/:id/treinadores", registarTreinadorController.handle);
//#endregion

//#region Locais de Medida
adminRouter.post("/:adminId/marca/:marcaId/localMedida", criarLocalMedidaController.handle);
adminRouter.delete("/:adminId/marca/:marcaId/localMedida/:id", removerLocalMedidaController.handle);
//#endregion

export { adminRouter };