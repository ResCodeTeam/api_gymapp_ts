/**
 * @module RemoverLocalMedidaController
 */
import { Request, Response } from "express";
import { RemoverLocalMedidaService } from "../../services/localMedida/removerLocalMedidaService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover locais de medida
 */
export class RemoverLocalMedidaController {
  /**
   * Permite remover locais de medida recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverLocalMedidaService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.adminId;
    const localId = request.params.id;
    const marcaId = request.params.marcaId;

    try{
      if (uid === undefined || localId === undefined || marcaId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerLocalMedidaService = new RemoverLocalMedidaService();
      const resp = await removerLocalMedidaService.execute(uid, marcaId, localId);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
