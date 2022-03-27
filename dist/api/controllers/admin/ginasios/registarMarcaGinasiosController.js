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
exports.RegistarMarcaGinasiosController = void 0;
const registarMarcaGinasiosService_1 = require("../../../services/admin/ginasios/registarMarcaGinasiosService");
class RegistarMarcaGinasiosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcaId = request.params.id;
            const { nome, rua, cp, cpExt, imagemUrl, lat, long } = request.body;
            const registarMarcaGinasiosController = new registarMarcaGinasiosService_1.RegistarMarcaGinasiosService();
            const resp = yield registarMarcaGinasiosController.execute({
                nome,
                rua,
                cp,
                cpExt,
                marcaId,
                imagemUrl,
                lat,
                long,
            });
            response.json(resp);
        });
    }
}
exports.RegistarMarcaGinasiosController = RegistarMarcaGinasiosController;
//# sourceMappingURL=registarMarcaGinasiosController.js.map