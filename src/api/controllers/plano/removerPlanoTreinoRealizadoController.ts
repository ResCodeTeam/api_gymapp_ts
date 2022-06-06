/**
 * @module RemoverPlanoTreinoRealizadoController
 */
import { Request, Response } from "express";
import { RemoverPlanoTreinoRealizadoService } from "../../services/plano/removerPlanoTreinoRealizadoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover o estado dos planos de treinos
 */
export class RemoverPlanoTreinoRealizadoController {
  /**
   * Permite remover o estado dos planos de treino recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverPlanoTreinoRealizadoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const alunoId = request.params.alunoId;
    const planoId = request.params.plano_id;

    try{
      if (alunoId === undefined || planoId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerPlanoTreinoRealizadoService =
        new RemoverPlanoTreinoRealizadoService();
      const resp = await removerPlanoTreinoRealizadoService.execute(
        alunoId,
        planoId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
