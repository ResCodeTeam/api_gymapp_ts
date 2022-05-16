import { Request, Response } from "express";
import { RemoverExercicioImagemService } from "../../../services/exercicios/editar/removerExercicioImagemService";

export class RemoverExercicioImagemController{
  async handle(request:Request, response:Response){
    const imagemId=request.params.imagemId;
    const treinadorId=response.locals.uid;
    const exercicioId=request.params.exercicioId;

    const removerExercicioImagemService = new RemoverExercicioImagemService();

    const resp = await removerExercicioImagemService.execute(imagemId, treinadorId,exercicioId);
    response.json(resp)
  }
}