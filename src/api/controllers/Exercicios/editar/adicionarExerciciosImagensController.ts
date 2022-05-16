import { Request, Response } from "express";
import { AdicionarExerciciosImagensService } from "../../../services/exercicios/editar/adicionarExercicioImagensService";

export class AdicionarExerciciosImagensController{
  async handle(request:Request, response:Response){
    const exercicioId = request.params.exercicioId;
    const treinadorId = response.locals.uid;
    const {url} = request.body;
    if(url === undefined){
      throw new Error("Pedido inválido")
    }
    
    const adicionarExerciciosImagensService = new AdicionarExerciciosImagensService
    const resp = await adicionarExerciciosImagensService.execute({exercicioId, treinadorId,url})
    response.json(resp)
    
  }
}