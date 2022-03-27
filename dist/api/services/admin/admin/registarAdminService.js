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
exports.RegistarAdminService = void 0;
const bcrypt_1 = require("bcrypt");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
const tagHelpers_1 = require("../../../helpers/tagHelpers");
const client_1 = require("../../../prisma/client");
class RegistarAdminService {
    execute({ email, nome, password, data_nasc, data_entrada, genero }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verificar se o aluno já está registado
            let existsEmail = yield (0, dbHelpers_1.checkEmail)(email);
            if (existsEmail) {
                throw Error("Email já registado!");
            }
            // Obter tag do aluno
            let hashtag = yield (0, tagHelpers_1.getTag)(nome);
            //encriptar a password do aluno
            let passwd = yield (0, bcrypt_1.hash)(password, 8);
            // obter o id da função
            let funcaoId = yield (0, dbHelpers_1.getFuncaoId)("Admin");
            const admin = yield client_1.client.users.create({
                data: {
                    email,
                    nome,
                    password: passwd,
                    data_nasc,
                    hashtag,
                    data_entrada,
                    genero,
                    funcao_id: funcaoId,
                }
            });
            return { "msg": "admin registado com sucesso", admin };
        });
    }
}
exports.RegistarAdminService = RegistarAdminService;
//# sourceMappingURL=registarAdminService.js.map