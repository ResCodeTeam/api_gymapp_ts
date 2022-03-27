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
exports.CriarPostsController = void 0;
const criarPostsService_1 = require("../../../services/admin/posts/criarPostsService");
class CriarPostsController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { criadorId, data, descricao, tipo, ginasioId } = request.body;
            const criarPostsService = new criarPostsService_1.CriarPostsService();
            const resp = yield criarPostsService.execute({
                criadorId,
                data,
                descricao,
                tipo,
                ginasioId,
            });
            response.json(resp);
        });
    }
}
exports.CriarPostsController = CriarPostsController;
//# sourceMappingURL=criarPostsController.js.map