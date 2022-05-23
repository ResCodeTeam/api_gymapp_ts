import { Request, Response } from "express";
import { VerMeusExerciciosService } from "../../services/exercicios/verMeusExerciciosService";

export class VerMeusExerciciosController {
  async handle(request: Request, response: Response) {
    const autorId = request.params.treinadorId;
    if (autorId === undefined) {
      response.status(500).json("Pedido inválido");
    }

    const verMeusExerciciosService = new VerMeusExerciciosService();
    const resp = await verMeusExerciciosService.execute({ autorId });
    response.status(resp.status).json(resp.data);
  }
}
