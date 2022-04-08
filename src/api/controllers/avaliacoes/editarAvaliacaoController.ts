import { Request, Response } from "express";
import { EditarAvaliacaoService } from "../../services/avaliacoes/editarAvaliacoesService";


export class EditarAvaliacaoController {
    async handle(request: Request, response: Response) {
        //Declarar Serviço
        const editarAvaliacaoService = new EditarAvaliacaoService()

        //Pedir request.body (Request)
        const data = {
            data: new Date(request.body.data),
            peso: request.body.peso,
            unidade_peso: request.body.unidade_peso,
            musculo: request.body.musculo,
            gordura_corporal: request.body.gordura_corporal,
            gordura_visceral: request.body.gordura_visceral,
            agua: request.body.agua,
            proteina: request.body.proteina,
            massa_ossea: request.body.massa_ossea,
            metabolismo_basal: request.body.metabolismo_basal,
        }

        //Avaliação ID por parametro
        const avaliacao_id = request.params.id;

        //Utilizar Serviço criado
        const resp = await editarAvaliacaoService.execute(data,avaliacao_id)

        //Enviar Resposta
        if(resp == "404"){
            response.status(404).json("Não existe avaliação com o id fornecido")
        }
        response.json(resp)


    }
}