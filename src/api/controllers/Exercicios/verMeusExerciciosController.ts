import { Request, Response } from "express";
import { VerMeusExerciciosService } from "../../services/exercicios/verMeusExerciciosService";



export class VerMeusExerciciosController {

    async handle(request: Request, response: Response) {
        const autorId = request.params.treinadorId;
        if (autorId === undefined) {
            response.json("Pedido inválido").status(500);
        }

        const verMeusExerciciosService = new VerMeusExerciciosService();
        const resp = await verMeusExerciciosService.execute({autorId});
        response.json(resp.data).status(resp.status);
    }
}