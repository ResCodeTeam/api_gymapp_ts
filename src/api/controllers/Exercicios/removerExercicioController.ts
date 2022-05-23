import { Request, Response } from "express";
import { RemoverExercicioService } from "../../services/exercicios/removerExercicioService";

export class RemoverExercicioController {
    async handle(request: Request, response: Response) {
        const exercicioId = request.params.exercicios_id
        const autorId = request.params.treinadorId;
        if (exercicioId === undefined || autorId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const removerExercicioService = new RemoverExercicioService()
        const resp = await removerExercicioService.execute(exercicioId, autorId);
        response.status(resp.status).json(resp.data);
    }
}

