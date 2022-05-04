import { Request, Response } from "express";
import { changeTimeZone } from "../../helpers/dateHelpers";
import { CriarDesafiosService } from "../../services/desafios/criarDesafiosService";

class CriarDesafiosController {
    async handle(request: Request, response: Response) {
        const criadorId = response.locals.uid
        const ginasioId = request.params.id;
        let { nome, modalidadeId, dataInicio, dataFim, recompensa, descricao, exercicios, regras } = request.body;
        if (nome === undefined || modalidadeId === undefined || dataInicio === undefined || dataFim === undefined || recompensa === undefined || descricao === undefined || exercicios === undefined || regras === undefined) {
            throw new Error("Pedido inválido")
        }

        let hoje = new Date();
        dataInicio = new Date(dataInicio);
        dataFim = new Date(dataFim);


        changeTimeZone(hoje)
        if (dataInicio < hoje) {
            throw new Error("Data de início deve ser posterior ou igual a data atual")
        }
        if (dataFim < hoje) {
            throw new Error("Data de fim deve ser posterior a data atual")
        }

        if (dataInicio >= dataFim) {
            throw new Error("Data de início deve ser anterior à data de fim")
        }

        if (dataFim <= dataInicio) {
            throw new Error("Data de fim deve ser posterior à data de início")
        }

        const criarDesafiosService = new CriarDesafiosService();
        const resp = await criarDesafiosService.execute({ criadorId, nome, modalidadeId, dataInicio, dataFim, recompensa, ginasioId, descricao, exercicios, regras });
        response.json(resp);
    }
}

export { CriarDesafiosController };