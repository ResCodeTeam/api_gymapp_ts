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
exports.RemoverPostService = void 0;
const client_1 = require("../../../prisma/client");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
class RemoverPostService {
    execute(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsPost = yield (0, dbHelpers_1.checkPostExists)(postId);
            if (!existsPost) {
                throw new Error("A modalidade não existe");
            }
            //apagar identificações
            client_1.client.identificacoes_publicacoes.deleteMany({
                where: {
                    publicacao_id: postId
                }
            });
            //apagar gostos publicação
            client_1.client.gostos_publicacao.deleteMany({
                where: {
                    publicacao_id: postId
                }
            });
            // apagar comentarios
            const comentarios = yield client_1.client.comentarios_publicacao.findMany({
                where: {
                    publicacao_id: postId
                }
            });
            for (let i = 0; i < comentarios.length; i++) {
                const comentarioId = comentarios[i]['dataValues']['comentario_id'];
                // apagar likes comentarios
                client_1.client.gostos_comentario.deleteMany({
                    where: {
                        comentario_id: comentarioId
                    }
                });
                client_1.client.comentarios_publicacao.deleteMany({
                    where: {
                        comentario_id: comentarioId
                    }
                });
            }
            client_1.client.publicacoes.delete({
                where: {
                    publicacao_id: postId
                }
            });
            return {
                msg: "publicacao removida com sucesso"
            };
        });
    }
}
exports.RemoverPostService = RemoverPostService;
//# sourceMappingURL=removerPostService.js.map