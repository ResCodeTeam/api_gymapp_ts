import { Request, Response } from "express";
import { RemoverExercicioService } from "../../services/exercicios/removerExercicioService";

export class RemoverExercicioController {
    async handle(request: Request, response: Response) {
        const exercicioId = request.params.exercicios_id
        const autorId = request.params.treinadorId;
        
        const removerExercicioService = new RemoverExercicioService()
        const resp = await removerExercicioService.execute(exercicioId, autorId);
        response.json(resp.data).status(resp.status);
    }
}

