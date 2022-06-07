/**
 * @module RemoverMarcaController
 */
import { Request, Response } from "express";
import { RemoverMarcaService } from "../../services/marcas/removerMarcaService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover marcas
 */
export class RemoverMarcaController {
  /**
   * Permite remover uma marca recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverMarcaService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.adminId;
    const marcaId = request.params.id;

    try{
      if (uId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerMarcaService = new RemoverMarcaService();
      const resp = await removerMarcaService.execute(uId, marcaId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    } 
  }
}
