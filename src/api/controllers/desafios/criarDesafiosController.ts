/**
 * @module CriarDesafiosController
 */
import { Request, Response } from "express";
import { changeTimeZone } from "../../helpers/dateHelpers";
import { CriarDesafiosService } from "../../services/desafios/criarDesafiosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para criar desafios
 */
class CriarDesafiosController {
  /**
   * Permite criar desafios recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   * Verifica também se as datas foram inseridas corretamente. POr exemplo: não se pode ter uma data de início inferior à data atual
   * 
   * {@link CriarDesafiosService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const criadorId = request.params.userId;
    const ginasioId = request.params.id;
    let {
      nome,
      modalidadeId,
      dataInicio,
      dataFim,
      recompensa,
      descricao,
      exercicios,
      regras,
    } = request.body;

    try{
      if (
        criadorId === undefined ||
        ginasioId === undefined ||
        nome === undefined ||
        modalidadeId === undefined ||
        dataInicio === undefined ||
        dataFim === undefined ||
        recompensa === undefined ||
        descricao === undefined ||
        exercicios === undefined ||
        regras === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      let hoje = new Date();
      dataInicio = new Date(dataInicio);
      dataFim = new Date(dataFim);
  
      changeTimeZone(hoje);
      if (dataInicio < hoje) {
        throw new Error("Data de início deve ser posterior ou igual a data atual");
      }
      if (dataFim < hoje) {
        throw new Error("Data de fim deve ser posterior a data atual");
      }
  
      if (dataInicio >= dataFim) {
        throw new Error("Data de início deve ser anterior à data de fim");
      }
      if (dataFim <= dataInicio) {
        throw new Error("Data de fim deve ser posterior à data de início");
      }
  
      const criarDesafiosService = new CriarDesafiosService();
      const resp = await criarDesafiosService.execute({
        criadorId,
        nome,
        modalidadeId,
        dataInicio,
        dataFim,
        recompensa,
        ginasioId,
        descricao,
        exercicios,
        regras,
      });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}


export { CriarDesafiosController };
