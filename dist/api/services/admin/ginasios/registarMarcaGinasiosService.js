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
exports.RegistarMarcaGinasiosService = void 0;
const client_1 = require("../../../prisma/client");
const dbHelpers_1 = require("../../../helpers/dbHelpers");
const tagHelpers_1 = require("../../../helpers/tagHelpers");
class RegistarMarcaGinasiosService {
    execute({ nome, rua, cp, cpExt, marcaId, imagemUrl, lat, long, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Obter a tag do ginásio automaticamente
            let tag = yield (0, tagHelpers_1.getGymTag)(nome);
            const exists_marca = yield (0, dbHelpers_1.checkUserIdExists)(marcaId);
            if (exists_marca) {
                throw new Error("A marca não existe");
            }
            console.log("teste");
            const localidade = yield client_1.client.localidades.findFirst({
                where: {
                    cp,
                    cp_ext: cpExt
                }
            });
            const ginasio = yield client_1.client.ginasio.create({
                data: {
                    nome,
                    rua,
                    tag,
                    imagem_url: "teste",
                    lat,
                    long,
                    localidades: {
                        connect: {
                            cp_id: localidade.cp_id
                        }
                    },
                    marcas: {
                        connect: {
                            marca_id: marcaId
                        }
                    }
                },
            });
            console.log("teste1");
            return {
                msg: "O ginásio foi criado com sucesso!",
                ginasio
            };
        });
    }
}
exports.RegistarMarcaGinasiosService = RegistarMarcaGinasiosService;
//# sourceMappingURL=registarMarcaGinasiosService.js.map