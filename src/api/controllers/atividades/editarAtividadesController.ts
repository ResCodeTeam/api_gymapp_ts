/**
 * @module EditarAtividadesController
 */
import { Request, Response } from "express";
import { EditarAtividadesService } from "../../services/atividades/editarAtividadesService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar atividades
 */
export class EditarAtividadesController {
  /**
   * Permite editar atividades recebendo os dados pelo body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarAtividadesService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const atividadeId = request.params.id;
    const { descricao, icon } = request.body;

    try{
      if (
        atividadeId === undefined ||
        descricao === undefined ||
        icon === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const editarAtividadesService = new EditarAtividadesService();
      const resp = await editarAtividadesService.execute({
        atividadeId,
        descricao,
        icon,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
