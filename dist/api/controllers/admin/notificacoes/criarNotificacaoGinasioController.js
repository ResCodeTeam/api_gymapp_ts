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
exports.CriarNotificacaoGinasioController = void 0;
const criarNotificacaoGinasioService_1 = require("../../../services/admin/notificacoes/criarNotificacaoGinasioService");
class CriarNotificacaoGinasioController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userId, ginasioId, conteudo, data, tipo } = request.body;
            data = new Date(data);
            console.log(data);
            const criarNotificacaoMarcarController = new criarNotificacaoGinasioService_1.CriarNotificacaoGinasioService();
            const resp = yield criarNotificacaoMarcarController.execute({
                userId,
                ginasioId,
                conteudo,
                data,
                tipo
            });
            response.json(resp);
        });
    }
}
exports.CriarNotificacaoGinasioController = CriarNotificacaoGinasioController;
//# sourceMappingURL=criarNotificacaoGinasioController.js.map