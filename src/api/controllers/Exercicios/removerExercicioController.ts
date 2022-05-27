import { Request, Response } from "express";
import { RemoverExercicioService } from "../../services/exercicios/removerExercicioService";

export class RemoverExercicioController {
  async handle(request: Request, response: Response) {
    const exercicioId = request.params.exercicios_id;
    const autorId = request.params.treinadorId;

    try{
      if (exercicioId === undefined || autorId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const removerExercicioService = new RemoverExercicioService();
      const resp = await removerExercicioService.execute(exercicioId, autorId);
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
