import { Request, Response } from "express";
import { EditarAvaliacaoService } from "../../services/avaliacoes/editarAvaliacoesService";


export class EditarAvaliacaoController {
    async handle(request: Request, response: Response) {
        //Declarar Serviço
        const editarAvaliacaoService = new EditarAvaliacaoService()
        const treinadorId = request.params.treinadorId;
        //Pedir request.body (Request)
        const data = {
            peso: request.body.peso,
            unidade_peso: request.body.unidade_peso,
            musculo: request.body.musculo,
            gordura_corporal: request.body.gordura_corporal,
            gordura_visceral: request.body.gordura_visceral,
            agua: request.body.agua,
            proteina: request.body.proteina,
            massa_ossea: request.body.massa_ossea,
            metabolismo_basal: request.body.metabolismo_basal,
            medidas: request.body.medidas,
            imagens: request.body.imagens,
        }
        if (data.peso === undefined ||
            data.unidade_peso === undefined ||
            data.musculo === undefined ||
            data.gordura_corporal === undefined ||
            data.gordura_visceral === undefined ||
            data.agua === undefined ||
            data.proteina === undefined ||
            data.massa_ossea === undefined ||
            data.metabolismo_basal === undefined ||
            data.medidas === undefined ||
            data.imagens === undefined) {
            throw new Error("Pedido inválido")
        }

        //Avaliação ID por parametro
        const avaliacao_id = request.params.id;

        //Utilizar Serviço criado
        const resp = await editarAvaliacaoService.execute(data, avaliacao_id, treinadorId)

        response.json(resp)


    }
}