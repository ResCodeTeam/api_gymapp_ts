import express from "express";
const authRouter = express.Router();

import { AuthController } from "../controllers/auth/autenticacaoController";
import { GerarTokenController } from "../controllers/auth/gerarTokenController";
import { LogoutController } from "../controllers/auth/logoutController";




const autenticacaoController = new AuthController();
const gerarTokenController = new GerarTokenController();
const logoutController = new LogoutController();

authRouter.post("/login", autenticacaoController.handle)
authRouter.post("/token", gerarTokenController.handle)
authRouter.delete("/:userId/logout", logoutController.handle)

export { authRouter };
