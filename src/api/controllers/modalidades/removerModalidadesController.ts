/**
 * @module RemoverModalidadesController
 */
import { Request, Response } from "express";
import { RemoverModalidadesService } from "../../services/modalidades/removerModalidadesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover modalidades
 */
class RemoverModalidadesController {
  /**
   * Permite remover uma modalidade recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverModalidadesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.adminId;
    const modalidadeId = request.params.id;
    const ginasioId = request.params.ginasioId;

    try{
      if (
        uid === undefined ||
        modalidadeId === undefined ||
        ginasioId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerModalidadesService = new RemoverModalidadesService();
      const resp = await removerModalidadesService.execute(
        modalidadeId,
        ginasioId,
        uid
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}

export { RemoverModalidadesController };
