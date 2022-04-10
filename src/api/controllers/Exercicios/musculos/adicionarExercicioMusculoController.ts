import { Request, Response } from "express";
import { AdicionarExercicioMusculoService } from "../../../services/exercicios/musculos/adicionarExercicioMusculosService";

export class AdicionarExercicioMusculoController{
  async handle(request:Request, response:Response){
    const treinadorId = request.params.treinadorId;
    const exercicioId = request.params.exercicioId;
    const musculoId = request.params.musculoId;

    console.log(treinadorId,exercicioId,musculoId)

    const adicionarExercicioMusculoService = new AdicionarExercicioMusculoService();
    const resp = await adicionarExercicioMusculoService.execute(treinadorId,exercicioId,musculoId);

    response.json(resp)
    
    
    
  }
}