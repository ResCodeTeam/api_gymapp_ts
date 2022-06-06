/**
 * @module EditarDesafioController
 */
import { Request, Response } from "express";
import { changeTimeZone } from "../../helpers/dateHelpers";
import { EditarDesafioService } from "../../services/desafios/editarDesafiosService";

/**
 * Classe responsável por receber e chamar os métodos do serviço que serve para editar um desafio
 */
export class EditarDesafioController {
  /**
   * Permite editar um desafio recebendo os dados por body e parâmetro do request, verificando se este existem e redirecionado de seguida para o serviço associado
   * Verifica se a data fornecida é superior à data atual
   * 
   * {@link EditarDesafioService}
   * @param request pedido efetuado.
   * @param response resposta.
   */
  async handle(request: Request, response: Response) {
    const editarDesafioService = new EditarDesafioService();
    const uId = request.params.userId;

    const data = {
      nome: request.body.nome,
      modalidade: request.body.modalidade,
      recompensa: request.body.recompensa,
      descricao: request.body.descricao,
      data_inicio:
        request.body.dataInicio !== undefined
          ? new Date(request.body.dataInicio)
          : undefined,
      data_fim:
        request.body.dataFim !== undefined
          ? new Date(request.body.dataFim)
          : undefined,
    };

    try{
      if (
        uId === undefined ||
        data.nome === undefined ||
        data.recompensa === undefined ||
        data.descricao === undefined
      ) {
        throw new Error("Pedido inválido");
      }
      const desafioId = request.params.id;
  
      if (data.data_inicio >= data.data_fim) {
        throw new Error("Data de início deve ser anterior à data de fim");
      }
  
      if (data.data_fim <= data.data_inicio) {
        throw new Error("Data de fim deve ser posterior à data de início");
      }
  
      const resp = await editarDesafioService.execute(uId, data, desafioId);
  
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
