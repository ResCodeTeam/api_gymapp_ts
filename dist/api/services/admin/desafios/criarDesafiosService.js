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
exports.CriarDesafiosService = void 0;
class CriarDesafiosService {
    execute({ criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, estado, ginasioId, descricao, exercicios, regras }) {
        return __awaiter(this, void 0, void 0, function* () {
            //     const exists_criador = await checkUserIdExists(criadorId);
            //     if (!exists_criador) {
            //         throw new Error("O user não existe");
            //     }
            //     const exists_ginasio = await checkGinasioExists(ginasioId);
            //     if (!exists_ginasio) {
            //         throw new Error("Ginásio não existe");
            //     }
            //     const exists_modalidade = await checkModalidadeExists(modalidadeId);
            //     if (!exists_modalidade) {
            //         throw new Error("A modalidade não existe");
            //     }
            //     const exists_exercicio = await checkExercicioExists(exercicioId);
            //     if (!exists_exercicio) {
            //         throw new Error("O exercicio não existe");
            //     }
            //     const desafio = await client.desafios.create({
            //         data:{
            //             criador_id: criadorId,
            //             nome,
            //             modalidade_id: modalidadeId,
            //             data_inicio: dataInicio,
            //             data_fim: dataFim,
            //             recompensa,
            //             estado,
            //             descricao,
            //         }, 
            //     });
            //     // console.log(desafio);
            //     // para preencher a tabela regras com as suas informações
            //     for (let i = 0; i < regras.length; i++){
            //         const regra = await client.regras_desafio.create({
            //             data:{ desafio_id: desafio["dataValues"]["desafio_id"],
            //             descricao: regras[i]["descricao"],}, 
            //         });
            //     }
            //     // para preencher a tabela exercicios e series com as suas informações
            //     for (let i = 0; i < exercicios.length; i++) {
            //         const exercicio = await client.exercicios_desafio.create({
            //             data:{desafio_id: desafio["dataValues"]["desafio_id"],
            //             n_ordem_exercicio: exercicios[i]["n_ordem_exercicio"],
            //             exercicio_id: exercicios[i]["exercicio_id"],
            //             genero: exercicios[i]["genero"],
            //             //series: exercicios[i][]
            //             }    
            //         });
            //         const series = exercicios[i]["series"]
            //         // console.log(exercicio);
            //         for(let j = 0; j<series.length; j++) {
            //         const series = await client.series_desafio.create({data:{
            //             exercicio_desafio_id: exercicio["dataValues"]["exercicio_desafio_id"],
            //             n_ordem_serie: series[j]["n_ordem_serie"],
            //             repeticoes: series[j]["repeticoes"],
            //             peso: series[j]["peso"],
            //             unidade_medida: series[j]["unidade_medida"],};
            //         });
            //         }
            //     }
            //     return {
            //         msg: "O desafio foi criado com sucesso!",
            //     };
        });
    }
}
exports.CriarDesafiosService = CriarDesafiosService;
//# sourceMappingURL=criarDesafiosService.js.map