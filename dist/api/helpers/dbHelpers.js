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
exports.getUserByID = exports.checkNomeMarca = exports.checkModalidadeNome = exports.checkDonoMarca = exports.checkDonoGinasio = exports.getMarcaGym = exports.checkExercicioExists = exports.checkModalidadeExists = exports.checkMarcaExists = exports.checkGinasioExists = exports.checkPostExists = exports.getUserFuncao = exports.getFuncaoId = exports.checkUserIdExists = exports.checkEmail = void 0;
const client_1 = require("../prisma/client");
let checkEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.users.findMany({
        where: {
            email
        }
    });
    return search.length != 0;
});
exports.checkEmail = checkEmail;
let checkUserIdExists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.users.findMany({
        where: {
            uid: userId
        }
    });
    return search.length != 0;
});
exports.checkUserIdExists = checkUserIdExists;
let getUserByID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId);
    const user = yield client_1.client.users.findUnique({
        where: {
            uid: userId
        }
    });
    return user;
});
exports.getUserByID = getUserByID;
let getFuncaoId = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.funcoes.findFirst({
        where: {
            descricao: nome
        },
        select: {
            funcao_id: true
        }
    });
    if (search == null) {
        throw new Error("função inexistente");
    }
    return search === null || search === void 0 ? void 0 : search.funcao_id;
});
exports.getFuncaoId = getFuncaoId;
let getUserFuncao = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.users.findUnique({
        where: {
            uid
        },
        select: {
            funcao_id: true
        }
    });
    return search === null || search === void 0 ? void 0 : search.funcao_id;
});
exports.getUserFuncao = getUserFuncao;
let checkPostExists = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.publicacoes.findMany({
        where: {
            publicacao_id: postId
        }
    });
    return search.length != 0;
});
exports.checkPostExists = checkPostExists;
let checkGinasioExists = (ginasioId) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.ginasio.findMany({
        where: {
            ginasio_id: ginasioId
        }
    });
    return search.length != 0;
});
exports.checkGinasioExists = checkGinasioExists;
let checkMarcaExists = (marcaId) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.marcas.findMany({
        where: {
            marca_id: marcaId
        }
    });
    return search.length != 0;
});
exports.checkMarcaExists = checkMarcaExists;
let checkModalidadeExists = (modalidadeId) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.modalidades_ginasio.findMany({
        where: {
            modalidade_id: modalidadeId
        }
    });
    return search.length != 0;
});
exports.checkModalidadeExists = checkModalidadeExists;
let checkExercicioExists = (exercicioId) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.exercicios.findMany({
        where: {
            exercicio_id: exercicioId
        }
    });
    return search.length != 0;
});
exports.checkExercicioExists = checkExercicioExists;
let getMarcaGym = (ginasioId) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.ginasio.findFirst({
        where: {
            ginasio_id: ginasioId
        },
        select: {
            marca_id: true
        }
    });
    const marca = yield client_1.client.marcas.findFirst({
        where: {
            marca_id: search === null || search === void 0 ? void 0 : search.marca_id
        }
    });
    return marca;
});
exports.getMarcaGym = getMarcaGym;
let checkDonoGinasio = (ginasioId, donoId) => __awaiter(void 0, void 0, void 0, function* () {
    const search_admin = yield client_1.client.ginasio.findFirst({
        where: {
            ginasio_id: ginasioId
        },
        select: {
            marca_id: true,
            marcas: {
                select: {
                    dono_id: true,
                }
            }
        }
    });
    if ((search_admin === null || search_admin === void 0 ? void 0 : search_admin.marcas.dono_id) != donoId) {
        throw new Error(`Não tem permissões`);
    }
    return true;
});
exports.checkDonoGinasio = checkDonoGinasio;
let checkDonoMarca = (marcaID, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.marcas.findFirst({
        where: {
            marca_id: marcaID,
            dono_id: userId
        },
        select: {
            marca_id: true
        }
    });
    if (!(search === null || search === void 0 ? void 0 : search.marca_id)) {
        throw new Error(`Não tem permissões`);
    }
    return true;
});
exports.checkDonoMarca = checkDonoMarca;
// função que permite verificar se já existe alguma modalidade registada no ginásio com aquele nome
let checkModalidadeNome = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.modalidades_ginasio.findMany({
        where: {
            nome,
        },
    });
    return search.length != 0;
});
exports.checkModalidadeNome = checkModalidadeNome;
// função que permite verificar se já se encontra alguma marca com o nome registada
let checkNomeMarca = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    const search = yield client_1.client.marcas.findMany({
        where: {
            nome,
        },
    });
    return search.length != 0;
});
exports.checkNomeMarca = checkNomeMarca;
//# sourceMappingURL=dbHelpers.js.map