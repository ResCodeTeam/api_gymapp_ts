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
exports.RemoverDesafiosController = void 0;
const removerDesafiosService_1 = require("../../../services/admin/desafios/removerDesafiosService");
class RemoverDesafiosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const desafioId = request.params.id;
            const removerDesafiosController = new removerDesafiosService_1.RemoverDesafiosService();
            const resp = yield removerDesafiosController.execute(desafioId);
            response.json(resp);
        });
    }
}
exports.RemoverDesafiosController = RemoverDesafiosController;
//# sourceMappingURL=removerDesafiosController.js.map