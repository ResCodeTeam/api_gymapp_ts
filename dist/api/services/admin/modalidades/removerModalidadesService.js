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
exports.RemoverModalidadesService = void 0;
const client_1 = require("../../../prisma/client");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
class RemoverModalidadesService {
    execute(modalidadeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists_dst = yield (0, dbHelpers_1.checkModalidadeExists)(modalidadeId);
            if (!exists_dst) {
                throw new Error("A modalidade não existe");
            }
            client_1.client.modalidades_ginasio.delete({
                where: { modalidade_id: modalidadeId },
            });
            return {
                msg: "Modalidade removida com sucesso",
            };
        });
    }
}
exports.RemoverModalidadesService = RemoverModalidadesService;
//# sourceMappingURL=removerModalidadesService.js.map