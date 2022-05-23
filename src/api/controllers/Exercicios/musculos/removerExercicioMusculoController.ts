import { Request, Response } from "express";
import { RemoverExercicioMusculoService } from "../../../services/exercicios/musculos/removerExercicioMusculoService";

export class RemoverExercicioMusculoController {
  async handle(request: Request, response: Response) {
    const treinadorId = request.params.treinadorId;
    const exercicioId = request.params.exercicioId;
    const musculoId = request.params.musculoId;
    if (
      treinadorId === undefined ||
      exercicioId === undefined ||
      musculoId === undefined
    ) {
      response.status(500).json("Pedido inválido");
    }

    const removerMusculoExercicioService = new RemoverExercicioMusculoService();
    const resp = await removerMusculoExercicioService.execute(
      treinadorId,
      exercicioId,
      musculoId
    );
    response.status(resp.status).json(resp.data);
  }
}
