import { Request, Response } from "express";
import { EditarExerciciosImagensService } from "../../../../services/treinador/exercicios/editar/editarExercicioImagensService";

export class EditarExerciciosImagensController{
  async handle(request:Request, response:Response){
    const exercicioId = request.params.exercicioId;
    const treinadorId = request.params.treinadorId;
    const {nome, descricao, isTempo} = request.body;

    const editarExerciciosImagensService = new EditarExerciciosImagensService
    const resp = await editarExerciciosImagensService.execute({exercicioId, treinadorId,nome, descricao, isTempo})
    response.json(resp)
    
  }
}