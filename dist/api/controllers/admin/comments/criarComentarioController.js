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
exports.CriarComentarioController = void 0;
const criarComentarioService_1 = require("../../../services/admin/comments/criarComentarioService");
class CriarComentarioController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = request.params.id;
            const { comentario, criadorId, data } = request.body;
            const criarComentarioService = new criarComentarioService_1.CriarComentarioService();
            const resp = yield criarComentarioService.execute({ postId, comentario, criadorId, data });
            response.json(resp);
        });
    }
}
exports.CriarComentarioController = CriarComentarioController;
//# sourceMappingURL=criarComentarioController.js.map