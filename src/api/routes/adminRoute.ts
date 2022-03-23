import express from "express";
const adminRouter = express.Router();

//middlewares
import verificarAutenticacao from "../middlewares/verificarAutenticacao";

import { CriarPostsController } from "../controllers/admin/posts/criarPostsController";
import registar_alunos_controller from "../controllers/admin/registar_alunos_controller";
import criar_notificacao_user_controller from "../controllers/admin/notificacoes/criar_notificacao_user_controller";
import { RegistarUserMarcasController } from "../controllers/admin/marcas/registarUserMarcasController";
import { RegistarMarcaGinasiosController } from "../controllers/admin/ginasios/registarMarcaGinasiosController";
import { CriarGinasioModalidadesController } from "../controllers/admin/modalidades/criarGinasioModalidadesController";
import { CriarDesafiosController } from "../controllers/admin/desafios/criarDesafiosController";
import { CriarComentarioController } from "../controllers/admin/comments/criarComentarioController";
import ver_publicacoes_controller from "../controllers/admin/posts/ver_publicacoes_controller";
import removerPostsController from "../controllers/admin/posts/removerPostsController";
import { RemoverModalidadesController } from "../controllers/admin/modalidades/removerModalidadesController";
import eliminarTreinadorController from "../controllers/admin/treinador/eliminarTreinadorController";
import criarGostoController from "../controllers/admin/gostosPosts/criarGostoController";
import editarPublicacaoController from "../controllers/admin/posts/editarPublicacaoController";
import verificarAdmin from "../middlewares/verificarAdmin";
import encerrarDesafiosController from "../controllers/admin/desafios/encerrarDesafiosController";
import criar_notificacao_marca_controller from "../controllers/admin/notificacoes/criar_notificacao_marca_controller";

const criarComentarioController = new CriarComentarioController();
const registarUserMarcasController = new RegistarUserMarcasController();
const registarMarcaGinasiosController = new RegistarMarcaGinasiosController();
const criarGinasioModalidadesController = new CriarGinasioModalidadesController();
const removerModalidadesController = new RemoverModalidadesController();
const criarPostsController = new CriarPostsController();
const criarDesafiosController = new CriarDesafiosController();

adminRouter.post("/posts",criarPostsController.handle);
adminRouter.get("/posts", ver_publicacoes_controller);
adminRouter.put("/posts/:id", editarPublicacaoController);
adminRouter.delete("/posts/:id", removerPostsController);
adminRouter.post("/posts/:id/gostos", criarGostoController);

adminRouter.post("/posts/:id/comentarios/criar", criarComentarioController.handle);

adminRouter.put("/desafios/:id", encerrarDesafiosController);

adminRouter.post("/marca/alunos/registar", registar_alunos_controller);

adminRouter.post("/:id/marca/registar", registarUserMarcasController.handle);
adminRouter.post("/marca/:id/ginasio/registar", registarMarcaGinasiosController.handle);
adminRouter.post("/ginasio/:id/criar/modalidades", criarGinasioModalidadesController.handle);
adminRouter.post("/ginasio/:id/criar/desafios", criarDesafiosController.handle);

adminRouter.delete("/treinador/:id", eliminarTreinadorController);

adminRouter.post("/notificacao/criar/:id", criar_notificacao_user_controller);
adminRouter.post("/notificacao/criar/", criar_notificacao_marca_controller);

adminRouter.delete("/modalidades/:id", removerModalidadesController.handle);

export { adminRouter };

