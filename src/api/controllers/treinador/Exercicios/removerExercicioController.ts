import { Request, Response } from "express";
import { RemoverExercicioService } from "../../../services/treinador/exercicios/removerExercicioService";

export class RemoverExercicioController {
    async handle(request: Request, response: Response) {
        const exercicioId = request.params.id
        
        const removerExercicioService = new RemoverExercicioService()
        const resp = await removerExercicioService.execute(exercicioId);
        response.json(resp);
    }
}

