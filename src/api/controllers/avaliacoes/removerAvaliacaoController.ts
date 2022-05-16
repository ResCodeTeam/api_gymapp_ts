import { Request, Response } from "express";
import { RemoverAvaliacoesService } from "../../services/avaliacoes/removerAvaliacoesService";

export class RemoverAvaliacaoController {
    async handle(request: Request, response: Response) {
        const treinadorId = request.params.treinadorId;
        //Declarar Serviço
        const removerAvaliacaoService = new RemoverAvaliacoesService()

        //Pedir Id por parametro
        const avaliacao_id = request.params.id

        //Utilizar Serviço
        const resp = await removerAvaliacaoService.execute(avaliacao_id, treinadorId)

        //Enviar Resposta
        if (resp == "404") {
            response.status(404).json("Não existe avaliação com o id fornecido")
        }
        response.json(resp)
    }
}