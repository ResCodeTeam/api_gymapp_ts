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
exports.EncerrarDesafiosController = void 0;
const editarPublicacoesService_1 = require("../../../services/admin/posts/editarPublicacoesService");
class EncerrarDesafiosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = request.params.id;
            const { publicacaoId, data, descricao, tipo, ginasioId } = request.body;
            let newData = new Date(data);
            const editarPublicacaoController = new editarPublicacoesService_1.EditarPublicacaoService();
            const resp = yield editarPublicacaoController.execute({
                publicacaoId,
                newData,
                descricao
            });
            console.log(resp);
            response.status(200).json({
                'message': resp
            });
        });
    }
}
exports.EncerrarDesafiosController = EncerrarDesafiosController;
//# sourceMappingURL=editarPublicacaoController.js.map