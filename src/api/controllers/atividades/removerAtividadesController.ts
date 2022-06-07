/**
 * @module RemoverAtividadesController
 */
import { Request, Response } from "express";
import { RemoverAtividadesService } from "../../services/atividades/removerAtividadesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover atividades
 */
class RemoverAtividadesController {
  /**
   * Permite remover atividades recebendo os dados pelo parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverAtividadesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const atividadeId = request.params.id;

    try{
      if (atividadeId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerAtividadesService = new RemoverAtividadesService();
      const resp = await removerAtividadesService.execute(atividadeId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}

export { RemoverAtividadesController };
