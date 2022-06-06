/**
 * @module EditarMusculoController
 */
import { Request, Response } from "express";
import { EditarMusculoService } from "../../services/musculos/editarMusculoService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar músculos
 */
export class EditarMusculoController {
  /**
   * Permite editar um músculo recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link EditarMusculoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const musculoId = request.params.musculoId;
    const { nome, imagem } = request.body;

    try{
      if (musculoId === undefined || nome === undefined || imagem === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const editarMusculosService = new EditarMusculoService();
      const resp = await editarMusculosService.execute(musculoId, nome, imagem);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
