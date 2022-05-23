import { Request, Response } from "express";
import { RemoverAvaliacoesService } from "../../services/avaliacoes/removerAvaliacoesService";

export class RemoverAvaliacaoController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    //Declarar Serviço
    const removerAvaliacaoService = new RemoverAvaliacoesService();

    //Pedir Id por parametro
    const avaliacao_id = request.params.id;

    if (treinadorId === undefined || avaliacao_id === undefined) {
      response.status(500).json("Pedido inválido");
    }

    //Utilizar Serviço
    const resp = await removerAvaliacaoService.execute(
      avaliacao_id,
      treinadorId
    );

    response.status(resp.status).json(resp.data);
  }
}
