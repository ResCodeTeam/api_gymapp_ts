"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backendRouter = void 0;
const express_1 = __importDefault(require("express"));
const backendRouter = express_1.default.Router();
exports.backendRouter = backendRouter;
const registarFuncoesController_1 = require("../controllers/backend/registarFuncoesController");
const registarCpController_1 = require("../controllers/backend/registarCpController");
const registarFuncoesController = new registarFuncoesController_1.RegistarFuncoesController();
const registarCpController = new registarCpController_1.RegistarCpController();
//#region Admin
backendRouter.post("/funcoes/", registarFuncoesController.handle);
backendRouter.post("/cp/", registarCpController.handle);
backendRouter.post("/cp_ext/", registarFuncoesController.handle);
//# sourceMappingURL=backendRoute.js.map