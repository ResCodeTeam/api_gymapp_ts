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
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const client_1 = require("../../prisma/client");
class AuthService {
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_1.client.users.findFirst({
                where: {
                    email
                }
            });
            if (user == null) {
                throw new Error('Erro na autenticação!: Password ou Email errados');
            }
            const userId = user.uid;
            const passwd = user.password;
            const comp = yield (0, bcrypt_1.compare)(password, passwd);
            if (!comp) {
                throw new Error('Erro na autenticação!: Password ou Email errados');
            }
            const refreshToken = yield (0, jwtHelpers_1.generateRefreshToken)(userId);
            yield client_1.client.users.update({
                data: {
                    refresh_token: refreshToken
                },
                where: {
                    uid: userId
                }
            });
            const token = yield (0, jwtHelpers_1.generateSessionToken)(userId);
            return {
                message: "Login concluido com sucesso",
                token,
                refreshToken
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=autenticacaoService.js.map