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
exports.RemoverPostController = void 0;
const removerPostService_1 = require("../../../services/admin/posts/removerPostService");
class RemoverPostController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const post_id = request.params.id;
            const removerPostService = new removerPostService_1.RemoverPostService();
            const resp = yield removerPostService.execute(post_id);
            response.json(resp);
        });
    }
}
exports.RemoverPostController = RemoverPostController;
//# sourceMappingURL=removerPostController.js.map