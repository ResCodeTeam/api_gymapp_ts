import { Request, Response } from "express";
import { EditarExercicioService } from "../../../services/treinador/exercicios/editarExercicioService";


export class EditarExercicioController {
    async handle(request: Request, response: Response) {
        //Declarar Serviço
        const exercicioId = request.params.exercicios_id
        const autorId = request.params.id
        
        const editarExercicioService = new EditarExercicioService()
        const resp = await editarExercicioService = await editarExercicioService.execute(exercicioId, autorId);
        response.json(resp)
    }
}