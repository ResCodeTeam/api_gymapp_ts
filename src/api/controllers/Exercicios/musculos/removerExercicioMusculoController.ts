import { Request, Response } from "express";
import { RemoverExercicioMusculoService } from "../../../services/exercicios/musculos/removerExercicioMusculoService";

export class RemoverExercicioMusculoController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const exercicioId = request.params.exercicioId;
    const musculoId = request.params.musculoId;

    try{
      if (
        treinadorId === undefined ||
        exercicioId === undefined ||
        musculoId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerMusculoExercicioService = new RemoverExercicioMusculoService();
      const resp = await removerMusculoExercicioService.execute(
        treinadorId,
        exercicioId,
        musculoId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
