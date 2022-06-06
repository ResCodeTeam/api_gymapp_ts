/**
 * @module CriarAtividadeController
 */
import { Request, Response } from "express";
import { CriarAtividadeService } from "../../services/atividades/criarAtividadeService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar atividades
 */
class CriarAtividadeController {
  /**
   * Permite criar atividades recebendo os dados pelo body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link CriarAtividadeService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const { descricao, icon } = request.body;

    try{
      if (descricao === undefined || icon === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const criarAtividadeService = new CriarAtividadeService();
      const resp = await criarAtividadeService.execute({
        descricao,
        icon,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
    
  }
}
export { CriarAtividadeController };
