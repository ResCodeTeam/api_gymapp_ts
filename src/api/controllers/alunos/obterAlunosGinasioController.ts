import { Request, Response } from "express";
import { ObterAlunosGinasioService } from "../../services/alunos/obterAlunosGinasioService";

export class ObterAlunosGinasioController {
    async handle(request: Request, response: Response) {
        const ginasioId = request.params.id;
        const userId = request.params.userId;

        try{
            if (userId === undefined || ginasioId === undefined) {
                throw new Error("Pedido inválido")
            }
    
            const obterAlunosGinasioController = new ObterAlunosGinasioService();
            const message = await obterAlunosGinasioController.execute({
                ginasioId,
                userId
            });
    
            response.json(message.data).status(message.status);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}