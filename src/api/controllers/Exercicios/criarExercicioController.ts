import { Request, Response } from "express";
import { CriarExercicioService } from "../../services/exercicios/criarExercicioService";

export class CriarExercicioController {
  async handle(request: Request, response: Response) {
    const autor = request.params.treinadorId;
    const { nome, descricao, isTempo, imagens, musculos } = request.body;
    if (
      autor === undefined ||
      nome === undefined ||
      descricao === undefined ||
      isTempo === undefined ||
      imagens === undefined ||
      musculos === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }

    const criarExercicioService = new CriarExercicioService();
    const resp = await criarExercicioService.execute({
      nome,
      descricao,
      autor,
      isTempo,
      imagens,
      musculos,
    });

    response.status(resp.status).json(resp.data);
  }
}
