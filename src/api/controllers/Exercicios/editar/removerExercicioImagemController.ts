import { Request, Response } from "express";
import { RemoverExercicioImagemService } from "../../../services/exercicios/editar/removerExercicioImagemService";

export class RemoverExercicioImagemController {
  async handle(request: Request, response: Response) {
    const imagemId = request.params.imagemId;
    const treinadorId = request.params.treinadorId;
    const exercicioId = request.params.exercicioId;
    if (imagemId === undefined || treinadorId === undefined || exercicioId === undefined) {
      response.json("Pedido inválido").status(500);
    }
    
    const removerExercicioImagemService = new RemoverExercicioImagemService();

    const resp = await removerExercicioImagemService.execute(imagemId, treinadorId, exercicioId);
    response.json(resp.data).status(resp.status);
  }
}