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
exports.CriarNotificacaoGinasioService = void 0;
const dbHelpers_1 = require("../../../helpers/dbHelpers");
const client_1 = require("../../../prisma/client");
class CriarNotificacaoGinasioService {
    execute({ userId, ginasioId, conteudo, data, tipo }) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region Verifica se o admin existe
            const existsUser = yield (0, dbHelpers_1.checkUserIdExists)(userId);
            if (!existsUser) {
                throw new Error("User não existe");
            }
            //#endregion
            //#region  Verifica se a marca existe
            const existsGinasio = yield (0, dbHelpers_1.checkGinasioExists)(ginasioId);
            if (!existsGinasio) {
                throw new Error("Ginásio não existe");
            }
            //#endregion
            //#region  Verifica se o admin é dono da marca
            const checkGinasioAdmin = yield (0, dbHelpers_1.checkDonoGinasio)(ginasioId, userId);
            //await models.marcas.findAll({ where: {marca_id: marcaId, dono_id: user_id}});
            if (!checkGinasioAdmin) {
                throw new Error("Não tem permições nesta marca");
            }
            //#endregion
            //#region Procurar todos os Alunos de uma Marca
            const ginasios = yield client_1.client.ginasio.findFirst({
                where: {
                    ginasio_id: ginasioId
                },
                select: {
                    ginasio_id: true,
                    aluno_ginasio: {
                        select: {
                            user_id: true,
                            users: {
                                select: {
                                    nome: true
                                }
                            }
                        }
                    }
                }
            });
            //#endregion
            ///Verificar se existe ginásios
            if (!ginasios) {
                throw new Error(`Não existe alunos`);
            }
            console.log(ginasios.aluno_ginasio);
            //#region Cria Notificação
            const notificacao = yield client_1.client.notificacoes.create({
                data: {
                    origem_uid: userId,
                    conteudo,
                    data,
                    tipo,
                }
            });
            //#endregion
            console.log(notificacao.noti_id);
            //#region Cria Destinos da Notificação
            let dstNoti;
            for (let i = 0; i < ginasios.aluno_ginasio.length; i++) {
                dstNoti = yield client_1.client.destinos_notificacao.create({
                    data: {
                        noti_id: notificacao.noti_id,
                        dest_uid: ginasios.aluno_ginasio[i].user_id
                    }
                });
            }
            if (!dstNoti) {
                throw new Error(`Não contém alunos`);
            }
            //#endregion
            return {
                message: "Notificação enviada com sucesso",
                ginasios
            };
        });
    }
}
exports.CriarNotificacaoGinasioService = CriarNotificacaoGinasioService;
//# sourceMappingURL=criarNotificacaoGinasioService.js.map