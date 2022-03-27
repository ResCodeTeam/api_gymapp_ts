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
exports.RegistarCpService = void 0;
const client_1 = require("../../prisma/client");
class RegistarCpService {
    execute({ cp, cpExt, rua, localidade }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.client.localidades.create({
                data: {
                    cp,
                    cp_ext: cpExt,
                    rua: rua.length > 0 ? rua : null,
                    localidade
                }
            });
            return { "msg": "Codigo postal registado com sucesso" };
        });
    }
}
exports.RegistarCpService = RegistarCpService;
//# sourceMappingURL=registarCpService.js.map