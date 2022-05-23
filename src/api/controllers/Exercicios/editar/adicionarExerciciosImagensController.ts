import { Request, Response } from "express";
import { AdicionarExerciciosImagensService } from "../../../services/exercicios/editar/adicionarExercicioImagensService";

export class AdicionarExerciciosImagensController {
  async handle(request: Request, response: Response) {
    const exercicioId = request.params.exercicioId;
    const treinadorId = request.params.treinadorId;
    const { url } = request.body;
    if (exercicioId === undefined || treinadorId === undefined || url === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const adicionarExerciciosImagensService = new AdicionarExerciciosImagensService
    const resp = await adicionarExerciciosImagensService.execute({ exercicioId, treinadorId, url })
    response.status(resp.status).json(resp.data);

  }
}