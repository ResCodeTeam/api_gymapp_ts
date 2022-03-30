import express from "express";

import { CriarPostsController } from "../controllers/all/posts/criarPostsController";
import { RemoverPostController } from "../controllers/all/posts/removerPostController";
import { VerTodosPostsController } from "../controllers/all/posts/obter/verTodosPostsController";
import { VerTodosPostsUserController } from "../controllers/all/posts/obter/verTodosPostsUserController";
import { VerInfoPostController } from "../controllers/all/posts/obter/verInfoPostController";

const allRouter = express.Router();


const criarPostsController = new CriarPostsController();
const verTodosPostsController = new VerTodosPostsController();
const removerPostsController = new RemoverPostController();
const verTodosPostsUserController = new VerTodosPostsUserController();
const verInfoPostInfoController = new VerInfoPostController();


//#region Publicacoes
allRouter.post("/posts", criarPostsController.handle);
allRouter.get("/posts", verTodosPostsController.handle);
allRouter.get("/posts/user/:id", verTodosPostsUserController.handle)
//!TODO: Fazer controller and service
allRouter.get("/posts/:id", verInfoPostInfoController.handle)
//ver info de post

// adminRouter.put("/posts/:id", editarPublicacaoController.handle);
allRouter.delete("/posts/:id", removerPostsController.handle);
// adminRouter.post("/posts/:id/gostos", criarGostoController.handle);
//#endregion

export { allRouter };