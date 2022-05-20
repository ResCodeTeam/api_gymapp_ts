import { Request, Response } from "express";
import { AdicionarExerciciosImagensService } from "../../../services/exercicios/editar/adicionarExercicioImagensService";

export class AdicionarExerciciosImagensController {
  async handle(request: Request, response: Response) {
    const exercicioId = request.params.exercicioId;
    const treinadorId = request.params.treinadorId;
    const { url } = request.body;
    if (exercicioId === undefined || treinadorId === undefined ||url === undefined) {
      response.json("Pedido inválido").status(500);
    }

    const adicionarExerciciosImagensService = new AdicionarExerciciosImagensService
    const resp = await adicionarExerciciosImagensService.execute({ exercicioId, treinadorId, url })
    response.json(resp.data).status(resp.status);

  }
}