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
exports.VerPostService = void 0;
class VerPostService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            // let posts = [];
            // const publicacoes = await client.publicacoes.findAll()
            //     for (let i=0; i<publicacoes.length; i++){
            //         posts.push(publicacoes[i]['dataValues']) // fazer um append numa lista destes valores
            //     }
            //     console.log(posts)
            // return {
            //     msg: "Publicação carregada",
            //     posts
            // }
        });
    }
}
exports.VerPostService = VerPostService;
//# sourceMappingURL=verPostService.js.map