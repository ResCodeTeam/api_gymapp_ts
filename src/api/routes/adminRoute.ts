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

import { verificarAdmin } from "../middlewares/verificarAdmin";
import { CriarNotificacaoMarcaController } from "../controllers/notificacoes/criarNotificacaoMarcaController";
import { CriarNotificacaoGinasioController } from "../controllers/notificacoes/criarNotificacaoGinasioController";
import { RegistarAlunoController } from "../controllers/alunos/registarAlunoController";
import { RegistarAdminController } from "../controllers/admin/registarAdminControllers";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";
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
const  editarModalidadesController = new EditarModalidadesController();
const editarMarcaController=new EditarMarcaController();
const removerMarcaController = new RemoverMarcaController();
const registarTreinadorController = new RegistarTreinadorController();
const removerGinasioController = new RemoverGinasioController();
const verUmGinasioController = new VerUmGinasioController();
const verTodosGinasiosController = new VerTodosGinasiosController();
const verUmaMarcaController = new VerUmaMarcaController();
const verTodasMarcasController = new VerTodasMarcasController();
const verTodasModalidadesController = new VerTodasModalidadesController();
const editarGinasioController=new EditarGinasioController();
const removerAlunoController= new RemoverAlunoController();
const verTreinadorGinasioController= new VerTreinadorGinasioController();
const criarLocalMedidaController = new CriarLocalMedidaController();
const removerLocalMedidaController = new RemoverLocalMedidaController();
const criarNotificacaoMarcaController = new CriarNotificacaoMarcaController();
const criarNotificacaoGinasioController = new CriarNotificacaoGinasioController();
const criarNotificacaoUserController = new CriarNotificacaoUserController();

//#region Alunos
adminRouter.post("/marca/alunos/", verificarAutenticacao ,verificarAdmin,registarAlunosController.handle);
adminRouter.delete("/aluno/remover/:uId",verificarAutenticacao,verificarAdmin, removerAlunoController.handle);
//#endregion

//#region Ginasios
adminRouter.post("/marca/:id/ginasio/", verificarAutenticacao, verificarAdmin, registarMarcaGinasiosController.handle);
adminRouter.delete("/ginasio/:id/", verificarAutenticacao, verificarAdmin, removerGinasioController.handle);
adminRouter.get("/ginasio/:id/", verificarAutenticacao, verificarAdmin, verUmGinasioController.handle);
adminRouter.get("/marca/:id/ginasio/", verificarAutenticacao, verificarAdmin, verTodosGinasiosController.handle);
adminRouter.put("/ginasio/editar/:ginasioId",verificarAutenticacao,verificarAdmin,editarGinasioController.handle);
adminRouter.get("/ginasio/treinador/ver/:marcaId", verificarAutenticacao,verificarAdmin,verTreinadorGinasioController.handle);
//#endregion

//#region Marcastreinador
adminRouter.post("/marca/", verificarAutenticacao, verificarAdmin, registarUserMarcasController.handle);
adminRouter.delete("/marca/:id", verificarAutenticacao, verificarAdmin, removerMarcaController.handle);
adminRouter.get("/marca/:id/", verificarAutenticacao, verificarAdmin,verUmaMarcaController.handle);
adminRouter.get("/marca/", verificarAutenticacao, verificarAdmin, verTodasMarcasController.handle);
adminRouter.put("/marca/:marcaId",verificarAutenticacao,verificarAdmin,editarMarcaController.handle);
//#endregion

//#region Modalidades
adminRouter.post("/ginasio/:id/modalidades", verificarAutenticacao , verificarAdmin,criarGinasioModalidadesController.handle);
adminRouter.delete("/ginasio/:ginasioId/modalidades/:id", verificarAutenticacao , verificarAdmin, removerModalidadesController.handle);
adminRouter.put("/ginasio/:ginasioId/modalidades/:id",verificarAutenticacao, verificarAdmin, editarModalidadesController.handle);
adminRouter.get("/ginasio/:id/modalidades/", verificarAutenticacao, verificarAdmin, verTodasModalidadesController.handle);
//#endregion

//#region Notificacoes
adminRouter.post("/notificacao/user/:id", verificarAutenticacao , verificarAdmin,criarNotificacaoUserController.handle);
adminRouter.post("/notificacao/marca/:marcaId", verificarAutenticacao, verificarAdmin, criarNotificacaoMarcaController.handle);
adminRouter.post("/notificacao/ginasio/:ginasioId", verificarAutenticacao ,verificarAdmin, criarNotificacaoGinasioController.handle);
//#endregion

//#region Treinadores
adminRouter.delete("/treinador/:id", verificarAutenticacao ,verificarAdmin, eliminarTreinadorController.handle);
adminRouter.post("/marca/:id/treinadores", verificarAutenticacao, verificarAdmin, registarTreinadorController.handle);
//#endregion

//#region Locais de Medida
adminRouter.post("/marca/:marcaId/localMedida", verificarAutenticacao, verificarAdmin, criarLocalMedidaController.handle);
adminRouter.delete("/marca/:marcaId/localMedida/:id", verificarAutenticacao, verificarAdmin, removerLocalMedidaController.handle);
//#endregion

export { adminRouter };