"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarDesafiosController = void 0;
const criarDesafiosService_1 = require("../../../services/admin/desafios/criarDesafiosService");
class CriarDesafiosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const ginasioId = request.params.id;
            const { criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, descricao, exercicios, regras } = request.body;
            const criarDesafiosController = new criarDesafiosService_1.CriarDesafiosService();
            const resp = yield criarDesafiosController.execute({ criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, ginasioId, descricao, exercicios, regras });
            response.json(resp);
        });
    }
}
exports.CriarDesafiosController = CriarDesafiosController;
//# sourceMappingURL=criarDesafiosController.js.map