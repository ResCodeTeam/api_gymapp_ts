import { Request, Response } from "express";
import { VerMeusExerciciosService } from "../../services/exercicios/verMeusExerciciosService";

export class VerMeusExerciciosController {
  async handle(request: Request, response: Response) {
    const autorId = request.params.treinadorId;

    try{
      if (autorId === undefined) {
        throw new Error("Pedido inválido");
      }
  
      const verMeusExerciciosService = new VerMeusExerciciosService();
      const resp = await verMeusExerciciosService.execute({ autorId });
      response.status(resp.status).json(resp.data);
    } catch (e) {
      response.status(500).json(e.message)
    }
  }
}
