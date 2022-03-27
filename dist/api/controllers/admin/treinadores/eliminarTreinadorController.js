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
exports.EliminarTreinadorController = void 0;
const eliminarTreinadorService_1 = require("../../../services/admin/treinadores/eliminarTreinadorService");
class EliminarTreinadorController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const treinador_id = request.params.id;
            const eliminarTreinadorService = new eliminarTreinadorService_1.EliminarTreinadorService();
            const resp = yield eliminarTreinadorService.execute({ treinador_id });
            response.json(resp);
        });
    }
    ;
}
exports.EliminarTreinadorController = EliminarTreinadorController;
//# sourceMappingURL=eliminarTreinadorController.js.map