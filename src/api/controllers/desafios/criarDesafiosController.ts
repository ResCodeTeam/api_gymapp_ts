import { Request, Response } from "express";
import { changeTimeZone } from "../../helpers/dateHelpers";
import { CriarDesafiosService } from "../../services/desafios/criarDesafiosService";

class CriarDesafiosController {
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
      response.status(500).json("Pedido inválido");
    }

    let hoje = new Date();
    dataInicio = new Date(dataInicio);
    dataFim = new Date(dataFim);

    changeTimeZone(hoje);
    if (dataInicio < hoje) {
      response
        .json("Data de início deve ser posterior ou igual a data atual")
        .status(500);
    }
    if (dataFim < hoje) {
      response.json("Data de fim deve ser posterior a data atual").status(500);
    }

    if (dataInicio >= dataFim) {
      response
        .json("Data de início deve ser anterior à data de fim")
        .status(500);
    }

    if (dataFim <= dataInicio) {
      response
        .json("Data de fim deve ser posterior à data de início")
        .status(500);
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
  }
}

export { CriarDesafiosController };
