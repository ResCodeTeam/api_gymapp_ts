import express from "express";
const authRouter = express.Router();

import { AuthController } from "../controllers/auth/autenticacaoController";

const autenticacaoController = new AuthController();

authRouter.post("/login", autenticacaoController.handle);
// authRouter.post("/token", tokenController);
// authRouter.delete("/logout", logoutController)

export { authRouter };
