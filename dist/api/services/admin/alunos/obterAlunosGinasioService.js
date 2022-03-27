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
exports.ObterAlunosGinasioService = void 0;
const dbHelpers_1 = require("../../../helpers/dbHelpers");
const client_1 = require("../../../prisma/client");
class ObterAlunosGinasioService {
    execute({ ginasioId, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsGinasio = yield (0, dbHelpers_1.checkGinasioExists)(ginasioId);
            if (!existsGinasio) {
                throw new Error(`Ginásio não existe`);
            }
            const checkDono = yield (0, dbHelpers_1.checkDonoGinasio)(ginasioId, userId);
            if (!checkDono) {
                throw new Error(`Não pode aceder a esse ginásio`);
            }
            let users = [];
            const alunos = yield client_1.client.aluno_ginasio.findMany({
                where: {
                    ginasio_id: ginasioId
                },
                select: {
                    users: {
                        select: {
                            uid: true,
                            nome: true,
                            hashtag: true,
                            imagem_url: true
                        }
                    }
                }
            });
            if (alunos.length == 0) {
                throw new Error(`Não foi encontrado nenhum aluno`);
            }
            // for (let i = 0; i < alunos.length; i++) {
            //     const utilizadores = await models.users.findOne({
            //         attributes: ['uid', 'nome', 'hashtag', 'imagem_url'],
            //         where: {uid: alunos[i].user_id}
            //     });
            //     users.push(utilizadores);
            // }
            // if (users.length == 0) {
            //     throw new Error(`Não foi encontrado nenhum utilizador`);
            // }
            for (let i = 0; i < alunos.length; i++) {
                console.log(alunos[i].users);
                users.push(alunos[i].users);
            }
            return {
                msg: "Obter alunos efetuada com sucesso",
                users
            };
        });
    }
}
exports.ObterAlunosGinasioService = ObterAlunosGinasioService;
//# sourceMappingURL=obterAlunosGinasioService.js.map