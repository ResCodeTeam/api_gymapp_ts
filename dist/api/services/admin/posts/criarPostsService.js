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
exports.CriarPostsService = void 0;
const client_1 = require("../../../prisma/client");
class CriarPostsService {
    execute({ criadorId, data, descricao, tipo, ginasioId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((criadorId != null && ginasioId != null) || (criadorId == null && ginasioId == null)) {
                // enviar erro - ou é de um ou é de outro
                throw new Error("Impossível criar post!");
            }
            else if (criadorId != null) {
                // é um post do ginasio
                // inserir na base de dados (sequelize)
                yield client_1.client.publicacoes.create({
                    data: {
                        criador_id: criadorId,
                        data,
                        descricao,
                        tipo,
                        ginasio_id: ginasioId,
                    },
                });
                return { msg: "post criado com sucesso!" };
            }
            else if (ginasioId != null) {
                // é um post de um utilizador
                // inserir na base de dados
                return { msg: "post criado com sucesso!" };
            }
        });
    }
}
exports.CriarPostsService = CriarPostsService;
//# sourceMappingURL=criarPostsService.js.map