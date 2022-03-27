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
exports.getGymTag = exports.getTag = void 0;
const client_1 = require("../prisma/client");
let getIniciaisTag = (nome) => {
    //separar todos os nomes do aluno
    let splittedName = nome.split(" ");
    //juntar todas as primeiras letras do nome
    let tag = "";
    for (let i = 0; i < splittedName.length; i++) {
        tag += splittedName[i].charAt(0);
    }
    return tag;
};
function getTag(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        let hashtag = getIniciaisTag(nome);
        const amount = yield client_1.client.users.count({
            where: {
                hashtag: {
                    startsWith: hashtag,
                }
            }
        });
        // caso o numero seja menor que 9 irá ficar do estilo -> 01
        hashtag += `_${(amount + 1) <= 9 ? "0" + (amount + 1) : (amount + 1)}`;
        return hashtag;
    });
}
exports.getTag = getTag;
function getGymTag(nome) {
    return __awaiter(this, void 0, void 0, function* () {
        let hashtag = getIniciaisTag(nome);
        const amount = yield client_1.client.ginasio.count({
            where: {
                tag: {
                    startsWith: hashtag,
                }
            }
        });
        hashtag += `_${(amount + 1) <= 9 ? "0" + (amount + 1) : (amount + 1)}`;
        return hashtag;
    });
}
exports.getGymTag = getGymTag;
//# sourceMappingURL=tagHelpers.js.map