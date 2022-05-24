import { Request, Response } from "express";
import { RemoverExercicioImagemService } from "../../../services/exercicios/editar/removerExercicioImagemService";

export class RemoverExercicioImagemController {
  async handle(request: Request, response: Response) {
    const imagemId = request.params.imagemId;
    const treinadorId = request.params.treinadorId;
    const exercicioId = request.params.exercicioId;

    try{
      if (
        imagemId === undefined ||
        treinadorId === undefined ||
        exercicioId === undefined
      ) {
        throw new Error("Pedido inválido");
      }
  
      const removerExercicioImagemService = new RemoverExercicioImagemService();
  
      const resp = await removerExercicioImagemService.execute(
        imagemId,
        treinadorId,
        exercicioId
      );
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
