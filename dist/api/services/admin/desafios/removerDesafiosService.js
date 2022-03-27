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
exports.RemoverDesafiosService = void 0;
const client_1 = require("../../../prisma/client");
//import desafios from "../../../models/desafios";
//import modalidadesGinasio from "../desafios/";
class RemoverDesafiosService {
    execute(desafioId) {
        return __awaiter(this, void 0, void 0, function* () {
            //apagar o criador dos desafios
            const desafio = yield client_1.client.desafios.findMany({
                where: {
                    desafio_id: desafioId
                }
            });
            if (desafio.length = 0) {
                throw new Error("Desafio não existe");
            }
            //apagar desafio de agendamentos
            yield client_1.client.agendamentos_desafios.deleteMany({
                where: {
                    desafio_id: desafioId
                }
            });
            //apagar desafio na submissao desafios
            yield client_1.client.submissoes_desafios.deleteMany({
                where: {
                    desafio_id: desafioId
                }
            });
            //apagar desafio em exercicios_desafio
            yield client_1.client.exercicios_desafio.deleteMany({
                where: {
                    desafio_id: desafioId
                }
            });
            //apagar regras_desafio
            yield client_1.client.regras_desafio.deleteMany({
                where: {
                    desafio_id: desafioId
                }
            });
            return {
                msg: "desafio removido com sucesso"
            };
        });
    }
}
exports.RemoverDesafiosService = RemoverDesafiosService;
//# sourceMappingURL=removerDesafiosService.js.map