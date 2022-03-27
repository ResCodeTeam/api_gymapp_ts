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
exports.CriarComentarioService = void 0;
class CriarComentarioService {
    execute({ postId, comentario, criadorId, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            // const exists_pub = await checkPostExists(post_id);
            // if(!exists_pub){
            //     throw new Error("Erro ao criar comentário")
            // }
            // const exists_criador = await checkUserIdExists(criador_id);
            // if(!exists_criador){
            //     throw new Error("Erro ao criar comentário")
            // }
            // await client.comentarios_publicacao.create({
            //     publicacao_id:post_id,
            //     comentario,
            //     criador_id:criador_id,
            //     data
            // })
            // return {
            //     msg: "Comentario publicado"
            // }
        });
    }
}
exports.CriarComentarioService = CriarComentarioService;
//# sourceMappingURL=criarComentarioService.js.map