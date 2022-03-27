"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const autenticacaoController_1 = require("../controllers/auth/autenticacaoController");
const gerarTokenController_1 = require("../controllers/auth/gerarTokenController");
const logoutController_1 = require("../controllers/auth/logoutController");
const verificarAutenticacao_1 = require("../middlewares/verificarAutenticacao");
const autenticacaoController = new autenticacaoController_1.AuthController();
const gerarTokenController = new gerarTokenController_1.GerarTokenController();
const logoutController = new logoutController_1.LogoutController();
authRouter.post("/login", autenticacaoController.handle);
authRouter.post("/:id/token", verificarAutenticacao_1.verificarAutenticacao, gerarTokenController.handle);
authRouter.delete("/:id/logout", verificarAutenticacao_1.verificarAutenticacao, logoutController.handle);
//# sourceMappingURL=authRoute.js.map