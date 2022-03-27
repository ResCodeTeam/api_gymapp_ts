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
exports.RegistarAlunoController = void 0;
const registarAlunoService_1 = require("../../../services/admin/alunos/registarAlunoService");
class RegistarAlunoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, nome, password, dataNasc, dataEntrada, genero, ginasioId } = request.body;
            dataNasc = new Date(dataNasc);
            dataEntrada = new Date(dataEntrada);
            const registarAlunoService = new registarAlunoService_1.RegistarAlunoService();
            const resp = yield registarAlunoService.execute({ email, nome, password, dataNasc, dataEntrada, genero, ginasioId });
            response.json(resp);
        });
    }
}
exports.RegistarAlunoController = RegistarAlunoController;
//# sourceMappingURL=registarAlunoController.js.map