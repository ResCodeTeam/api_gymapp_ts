import { Request, Response } from "express";
import { AdicionarExercicioMusculoService } from "../../../services/exercicios/musculos/adicionarExercicioMusculoService";

export class AdicionarExercicioMusculoController{
  async handle(request:Request, response:Response){
    const treinadorId = response.locals.treinadorId;
    const exercicioId = request.params.exercicioId;
    const musculoId = request.params.musculoId;

    const adicionarExercicioMusculoService = new AdicionarExercicioMusculoService();
    const resp = await adicionarExercicioMusculoService.execute(treinadorId,exercicioId,musculoId);

    response.json(resp)    
  }
}