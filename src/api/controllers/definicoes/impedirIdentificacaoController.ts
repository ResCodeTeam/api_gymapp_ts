/**
 * @module ImpedirIdentificacaoController
 */
import { Request, Response } from "express";
import { ImpedirIdentificacaoService } from "../../services/definicoes/impedirIdentificacaoservice";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar as identificações de um utilizador
 */
export class ImpedirIdentificacaoController {
  /**
   * Permite editar as identificações de um utilizador recebendo os dados por body do request, verificando se este existem e redirecionado de seguida para o serviço associado
   *
   * {@link ImpedirIdentificacaoService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const uid = request.params.userId;
    const { identificacoes } = request.body;

    try{
      if (uid === undefined || identificacoes === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const impedirIdentificacaoService = new ImpedirIdentificacaoService();
      const resp = await impedirIdentificacaoService.execute(uid, identificacoes);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
