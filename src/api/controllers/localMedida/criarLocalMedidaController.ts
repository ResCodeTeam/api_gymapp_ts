/**
 * @module CriarLocalMedidaController
 */
import { Request, Response } from "express";
import { CriarLocalMedidaService } from "../../services/localMedida/criarLocalMedidaService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar locais de medida
 */
export class CriarLocalMedidaController {
  /**
   * Permite criar um local de medida de medida recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarLocalMedidaService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.adminId;
    const marcaId = request.params.marcaId;
    const { descricao, unilado } = request.body;

    try{
      if (
        uid === undefined ||
        marcaId === undefined ||
        descricao === undefined ||
        unilado === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const criarLocalMedidaService = new CriarLocalMedidaService();
      const resp = await criarLocalMedidaService.execute(
        uid,
        marcaId,
        descricao,
        unilado
      );
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
