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
exports.CriarNotificacaoMarcaService = void 0;
const dbHelpers_1 = require("../../../helpers/dbHelpers");
const client_1 = require("../../../prisma/client");
class CriarNotificacaoMarcaService {
    execute({ userId, marcaId, conteudo, data, tipo }) {
        return __awaiter(this, void 0, void 0, function* () {
            //#region Verifica se o admin existe
            const existsUser = yield (0, dbHelpers_1.checkUserIdExists)(userId);
            if (!existsUser) {
                throw new Error("User não existe");
            }
            //#endregion
            //#region  Verifica se a marca existe
            const existsMarca = yield (0, dbHelpers_1.checkMarcaExists)(marcaId);
            if (!existsMarca) {
                throw new Error("Marca não existe");
            }
            //#endregion
            //#region  Verifica se o admin é dono da marca
            const checkMarcaAdmin = yield (0, dbHelpers_1.checkDonoMarca)(marcaId, userId);
            //await models.marcas.findAll({ where: {marca_id: marcaId, dono_id: user_id}});
            if (!checkMarcaAdmin) {
                throw new Error("Não tem permições nesta marca");
            }
            //#endregion
            //#region Procurar todos os Alunos de uma Marca
            const ginasios = yield client_1.client.ginasio.findMany({
                where: {
                    marca_id: marcaId
                },
                select: {
                    marca_id: true,
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
            console.log(ginasios[0].aluno_ginasio);
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
            //#region Cria Destinos da Notificação
            let dstNoti;
            for (let i = 0; i < ginasios.length; i++) {
                for (let j = 0; j < ginasios[i].aluno_ginasio.length; j++) {
                    dstNoti = yield client_1.client.destinos_notificacao.create({
                        data: {
                            noti_id: notificacao.noti_id,
                            dest_uid: ginasios[i].aluno_ginasio[j].user_id
                        }
                    });
                }
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
exports.CriarNotificacaoMarcaService = CriarNotificacaoMarcaService;
//# sourceMappingURL=criarNotificacaoMarcaService.js.map