import { Request, Response } from "express";
import { CriarExercicioService } from "../../services/exercicios/criarExercicioService";

export class CriarExercicioController {
  async handle(request: Request, response: Response) {
    const autor = request.params.treinadorId;
    const { nome, descricao, isTempo, imagens, musculos } = request.body;
    if (autor === undefined || nome === undefined || descricao === undefined || isTempo === undefined || imagens === undefined || musculos === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const criarExercicioService = new CriarExercicioService();
    const resp = await criarExercicioService.execute({ nome, descricao, autor, isTempo, imagens, musculos });

    response.json(resp.data).status(resp.status);
  }
}