import { Request, Response } from "express";
import { AdicionarExerciciosImagensService } from "../../../../services/treinador/exercicios/editar/adicionarExercicioImagensService";

export class AdicionarExerciciosImagensController{
  async handle(request:Request, response:Response){
    const exercicioId = request.params.exercicioId;
    const treinadorId = request.params.treinadorId;
    const {url} = request.body;

    const adicionarExerciciosImagensService = new AdicionarExerciciosImagensService
    const resp = await adicionarExerciciosImagensService.execute({exercicioId, treinadorId,url})
    response.json(resp)
    
  }
}