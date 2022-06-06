/**
 * @module EliminarTreinadorController
 */
import { Request, Response } from "express";
import { EliminarTreinadorService } from "../../services/treinadores/eliminarTreinadorService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover um treinador
 */
class EliminarTreinadorController {
  /**
   * Permite remover um treinador recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EliminarTreinadorService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const treinador_id = request.params.id;
    const userId = response.locals.uid;

    try {
      if (treinador_id === undefined || userId === undefined) {
        throw new Error("Pedido inválido");
      }

      const eliminarTreinadorService = new EliminarTreinadorService();
      const resp = await eliminarTreinadorService.execute({
        treinador_id,
        userId,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}

export { EliminarTreinadorController };
