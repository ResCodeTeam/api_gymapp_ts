import { Request, Response } from "express";
import { AdicionarExercicioMusculoService } from "../../../services/exercicios/musculos/adicionarExercicioMusculoService";

export class AdicionarExercicioMusculoController {
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
  
      const adicionarExercicioMusculoService =
        new AdicionarExercicioMusculoService();
      const resp = await adicionarExercicioMusculoService.execute(
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
