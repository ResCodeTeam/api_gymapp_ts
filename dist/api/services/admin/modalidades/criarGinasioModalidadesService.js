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
exports.CriarGinasioModalidadesService = void 0;
const client_1 = require("../../../prisma/client");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
class CriarGinasioModalidadesService {
    execute({ ginasioId, nome, imagemUrl, }) {
        return __awaiter(this, void 0, void 0, function* () {
            //verificar se a modalidade já existe
            const exist_nome = yield (0, dbHelpers_1.checkModalidadeNome)(nome);
            if (exist_nome) {
                throw new Error("A modalidade já existe");
            }
            yield client_1.client.modalidades_ginasio.create({
                data: {
                    ginasio_id: ginasioId,
                    nome,
                    imagem_url: imagemUrl,
                },
            });
            return { msg: "A modalidade foi criada com sucesso!" };
        });
    }
}
exports.CriarGinasioModalidadesService = CriarGinasioModalidadesService;
//# sourceMappingURL=criarGinasioModalidadesService.js.map