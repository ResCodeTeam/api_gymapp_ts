import express from "express";
const adminRouter = express.Router();

//middlewares
import verificarAutenticacao from "../middlewares/verificarAutenticacao";

import criar_posts_controller from "../controllers/admin/posts/criar_posts_controller";
import registar_alunos_controller from "../controllers/admin/registar_alunos_controller";
import criar_notificacao_user_controller from "../controllers/admin/notificacoes/criar_notificacao_user_controller";
import registarUserMarcasController from "../controllers/admin/marcas/registarUserMarcasController";
import registarMarcaGinasiosController from "../controllers/admin/ginasios/registarMarcaGinasiosController";
import criarGinasioModalidadesController from "../controllers/admin/modalidades/criarGinasioModalidadesController";
import criarDesafiosController from "../controllers/admin/desafios/criarDesafiosController";
import criar_comentario_controller from "../controllers/admin/comments/criar_comentario_controller";
import ver_publicacoes_controller from "../controllers/admin/posts/ver_publicacoes_controller";
import removerPostsController from "../controllers/admin/posts/removerPostsController";
import removerModalidadesController from "../controllers/admin/modalidades/removerModalidadesController";
import eliminarTreinadorController from "../controllers/admin/treinador/eliminarTreinadorController";
import criarGostoController from "../controllers/admin/gostosPosts/criarGostoController";
import editarPublicacaoController from "../controllers/admin/posts/editarPublicacaoController";
import verificarAdmin from "../middlewares/verificarAdmin";
import encerrarDesafiosController from "../controllers/admin/desafios/encerrarDesafiosController";
import criar_notificacao_marca_controller from "../controllers/admin/notificacoes/criar_notificacao_marca_controller";

adminRouter.post("/posts",criar_posts_controller);
adminRouter.get("/posts", ver_publicacoes_controller);
adminRouter.put("/posts/:id", editarPublicacaoController);
adminRouter.delete("/posts/:id", removerPostsController);
adminRouter.post("/posts/:id/gostos", criarGostoController);

adminRouter.post("/posts/:id/comentarios/criar", criar_comentario_controller);

adminRouter.put("/desafios/:id", encerrarDesafiosController);

adminRouter.post("/marca/alunos/registar", registar_alunos_controller);

adminRouter.post("/:id/marca/registar", registarUserMarcasController);
adminRouter.post("/marca/:id/ginasio/registar", registarMarcaGinasiosController);
adminRouter.post("/ginasio/:id/criar/modalidades", criarGinasioModalidadesController);
adminRouter.post("/ginasio/:id/criar/desafios", criarDesafiosController);

adminRouter.delete("/treinador/:id", eliminarTreinadorController);

adminRouter.post("/notificacao/criar/:id", criar_notificacao_user_controller);
adminRouter.post("/notificacao/criar/", criar_notificacao_marca_controller);

adminRouter.delete("/modalidades/:id", removerModalidadesController);

export { adminRouter };

