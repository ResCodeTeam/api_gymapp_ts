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
exports.RegistarAlunoService = void 0;
const client_1 = require("../../../prisma/client");
const bcrypt_1 = require("bcrypt");
const tagHelpers_1 = require("../../../helpers/tagHelpers");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
//TODO: Receber Marca e Gym para inserir o aluno
class RegistarAlunoService {
    execute({ email, nome, password, dataNasc, dataEntrada, genero, ginasioId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verificar se o aluno já está registado
            const existsEmail = yield (0, dbHelpers_1.checkEmail)(email);
            console.log(email, nome, password, dataNasc, dataEntrada, genero, ginasioId);
            if (existsEmail) {
                throw new Error("Email já registado!");
            }
            if (password.length < 5) {
                throw new Error("Nome inválido");
            }
            if (!email.includes("@")) {
                throw new Error("Email inválido");
            }
            if (genero != 0 && genero != 1) {
                throw new Error("Email inválido");
            }
            // Obter tag do aluno
            const hashtag = yield (0, tagHelpers_1.getTag)(nome);
            //encriptar a password do aluno
            let passwd = yield (0, bcrypt_1.hash)(password, 8);
            // obter o id da função
            const funcaoId = yield (0, dbHelpers_1.getFuncaoId)("Aluno");
            let existsGym = yield (0, dbHelpers_1.checkGinasioExists)(ginasioId);
            if (!existsGym) {
                throw new Error("Ginásio não existe");
            }
            if (nome.split(" ").length < 2) {
                throw new Error("Nome inválido");
            }
            const aluno = yield client_1.client.users.create({
                data: {
                    email,
                    nome,
                    password: passwd,
                    data_nasc: dataNasc,
                    hashtag,
                    data_entrada: dataEntrada,
                    genero,
                    funcoes: {
                        connect: {
                            funcao_id: funcaoId
                        }
                    }
                },
            });
            const uid = aluno.uid;
            try {
                const marca = yield (0, dbHelpers_1.getMarcaGym)(ginasioId);
                const marcaMobilidade = marca === null || marca === void 0 ? void 0 : marca.mobilidade;
                const marcaId = marca === null || marca === void 0 ? void 0 : marca.marca_id;
                if (marcaMobilidade) {
                    yield client_1.client.alunos_marca.create({
                        data: {
                            marcas: {
                                connect: {
                                    marca_id: marcaId
                                }
                            },
                            users: {
                                connect: {
                                    uid
                                }
                            }
                        },
                    });
                }
                else {
                    yield client_1.client.aluno_ginasio.create({
                        data: {
                            ginasio: {
                                connect: {
                                    ginasio_id: ginasioId
                                }
                            },
                            users: {
                                connect: {
                                    uid
                                }
                            }
                        },
                    });
                }
                return { msg: "Aluno Registado", aluno };
            }
            catch (e) {
                client_1.client.users.delete({
                    where: {
                        uid,
                    },
                });
                throw e;
            }
        });
    }
}
exports.RegistarAlunoService = RegistarAlunoService;
//# sourceMappingURL=registarAlunoService.js.map