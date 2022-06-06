/**
 * @module RemoverPlanoTreinoController
 */
import { Request, Response } from "express";
import { RemoverPlanoTreinoService } from "../../services/plano/removerPlanoTreinoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover um plano de treino
 */
export class RemoverPlanoTreinoController {
  /**
   * Permite remover um plano de treino recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverPlanoTreinoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const planoId = request.params.plano_id;

    try{
      if (treinadorId === undefined || planoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerPlanoTreinoService = new RemoverPlanoTreinoService();
      const resp = await removerPlanoTreinoService.execute(treinadorId, planoId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
