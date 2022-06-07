/**
 * @module RemoverGostoPublicacaoController
 */
import { Request, Response } from "express";
import { RemoverGostoPublicacaoService } from "../../../services/posts/gostosPosts/removerGostoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para remover gostos de publicações
 */
export class RemoverGostoPublicacaoController {
  /**
   * Permite remover um gosto de uma publicação recebendo os dados por parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link RemoverGostoPublicacaoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const publicacaoId = request.params.id;
    const userId = request.params.userId;

    try{
      if (publicacaoId === undefined || userId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerGostoService = new RemoverGostoPublicacaoService();
      const resp = await removerGostoService.execute(publicacaoId, userId);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
