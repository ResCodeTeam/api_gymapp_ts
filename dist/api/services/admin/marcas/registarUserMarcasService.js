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
exports.RegistarUserMarcasService = void 0;
const client_1 = require("../../../prisma/client");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
class RegistarUserMarcasService {
    execute({ userId, nome, mobilidade, cor, logotipo, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists_user = yield (0, dbHelpers_1.checkUserIdExists)(userId);
            if (!exists_user) {
                throw new Error("User não existe!");
            }
            const exist_nome = yield (0, dbHelpers_1.checkNomeMarca)(nome);
            if (exist_nome) {
                throw new Error("A marca já existe");
            }
            const marca = yield client_1.client.marcas.create({
                data: {
                    dono_id: userId,
                    nome,
                    mobilidade,
                    cor,
                    logotipo,
                },
            });
            return { msg: "A marca foi criada com sucesso!", marca };
        });
    }
}
exports.RegistarUserMarcasService = RegistarUserMarcasService;
//# sourceMappingURL=registarUserMarcasService.js.map