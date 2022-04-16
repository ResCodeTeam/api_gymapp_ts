import { Request, Response } from "express";
import { ObterAlunosGinasioService } from "../../services/alunos/obterAlunosGinasioService";

export class ObterAlunosGinasioController{
    async handle(request : Request, response :Response){
        const ginasioId = request.params.id;
        const {userId} = request.body;
        if(userId === undefined){
            throw new Error("Pedido inválido")
        }

        const obterAlunosGinasioController = new ObterAlunosGinasioService();
        const message = await obterAlunosGinasioController.execute({
            ginasioId,
            userId
        });

        response.json(message);
    }
}