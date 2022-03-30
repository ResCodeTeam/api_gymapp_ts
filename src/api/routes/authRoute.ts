import express from "express";
const authRouter = express.Router();

import { AuthController } from "../controllers/auth/autenticacaoController";
import { GerarTokenController } from "../controllers/auth/gerarTokenController";
import { LogoutController } from "../controllers/auth/logoutController";
import { verificarAutenticacao } from "../middlewares/verificarAutenticacao";



const autenticacaoController = new AuthController();
const gerarTokenController = new GerarTokenController();
const logoutController = new LogoutController();

authRouter.post("/login", autenticacaoController.handle)
authRouter.post("/:id/token",verificarAutenticacao,gerarTokenController.handle)
authRouter.delete("/:id/logout",verificarAutenticacao,logoutController.handle)

export { authRouter };
