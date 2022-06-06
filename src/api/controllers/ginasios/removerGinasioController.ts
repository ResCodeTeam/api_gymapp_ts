/**
 * @module RemoverGinasioController
 */
import { Request, Response } from "express";
import { RemoverGinasioService } from "../../services/ginasios/removerGinasioService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover um ginásio
 */
class RemoverGinasioController {
  /**
   * Permite remover um ginásio recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverGinasioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.adminId;
    const ginasioId = request.params.id;

    try{
      if (uId === undefined || ginasioId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerGinasioService = new RemoverGinasioService();
      const resp = await removerGinasioService.execute(uId, ginasioId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }  
  }
}

export { RemoverGinasioController };
