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
exports.RegistarAdminController = void 0;
const registarAdminService_1 = require("../../../services/admin/admin/registarAdminService");
class RegistarAdminController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, nome, password, data_nasc, data_entrada, genero } = request.body;
            const registarAdminService = new registarAdminService_1.RegistarAdminService();
            data_nasc = new Date(data_nasc);
            data_entrada = new Date(data_entrada);
            const resp = yield registarAdminService.execute({ email, nome, password, data_nasc, data_entrada, genero });
            response.status(200).json(resp);
        });
    }
}
exports.RegistarAdminController = RegistarAdminController;
//# sourceMappingURL=registarAdminControllers.js.map