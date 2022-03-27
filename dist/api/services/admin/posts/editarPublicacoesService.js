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
exports.EditarPublicacaoService = void 0;
const client_1 = require("../../../prisma/client");
class EditarPublicacaoService {
    execute({ publicacaoId, newData, descricao }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (publicacaoId == null) {
                throw new Error("Impossível aceder à publicação.");
            }
            const existePublicacao = yield client_1.client.publicacoes.findMany({
                where: {
                    publicacao_id: publicacaoId,
                },
                select: {
                    publicacao_id: true
                }
            });
            if (!existePublicacao) {
                throw new Error("Não encontrou a publicação");
            }
            if (newData == null) {
                throw new Error("Falta a data");
            }
            const verificaData = yield client_1.client.publicacoes.findMany({
                where: {
                    publicacao_id: publicacaoId,
                    data: {
                        gte: newData
                    }
                },
                select: {
                    data: true
                }
            });
            if (verificaData) {
                throw new Error("Não é possivel alterar! Data inválida");
            }
            if (descricao == null) {
                throw new Error("Falta a descrição");
            }
            const verificaDescricao = yield client_1.client.publicacoes.findMany({
                where: {
                    publicacao_id: publicacaoId,
                    descricao: {
                        equals: descricao
                    }
                },
                select: {
                    data: true
                }
            });
            if (verificaDescricao) {
                throw new Error("Não é possivel alterar! Descrição é igual");
            }
            const publicação = yield client_1.client.publicacoes.update({
                where: {
                    publicacao_id: publicacaoId
                },
                data: {
                    data: newData,
                    descricao
                }
            });
            return {
                message: "Desafio encerrado com sucesso!",
                publicação
            };
        });
    }
}
exports.EditarPublicacaoService = EditarPublicacaoService;
//# sourceMappingURL=editarPublicacoesService.js.map