/**
 * @module EditarPostsController
 */
import { Request, Response } from "express";
import { EditarPublicacaoService } from "../../services/posts/editarPublicacoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar publicações
 */
export class EditarPublicacaoController {
  /**
   * Permite editar uma publicação recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarPublicacaoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uId = request.params.userId;
    const publicacaoId = request.params.id;

    const { descricao } = request.body;

    try{
      if (
        uId === undefined ||
        publicacaoId === undefined ||
        descricao === undefined
      ) {
        throw new Error("Pedido inválido");
      }
      let newData = new Date(Date.now());
      const editarPublicacaoService = new EditarPublicacaoService();
  
      const resp = await editarPublicacaoService.execute({
        uId,
        publicacaoId,
        newData,
        descricao,
      });
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
