/**
 * @module EditarMencoesController
 */
import { Request, Response } from "express";
import { EditarMencoesService } from "../../services/definicoes/editarMencoesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar menções de um utilizador
 */
export class EditarMencoesController {
  /**
   * Permite editar menções de um utilizador recebendo os dados por body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarMencoesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;
    const { mencoes } = request.body;

    try{
      if (uid === undefined || mencoes === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const editarMencoesService = new EditarMencoesService();
      const resp = await editarMencoesService.execute(uid, mencoes);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
