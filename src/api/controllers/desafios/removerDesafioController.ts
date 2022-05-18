import { Request, Response } from "express";
import { RemoverDesafioService } from "../../services/desafios/removerDesafioService";


export class RemoverDesafioController {
    async handle(request: Request, response: Response) {

        //Serviço
        const removerDesafioService = new RemoverDesafioService();

        //Pedir Id do desafio por parametro
        const desafioId = request.params.id;
        const uId = request.params.userId;

        //Invocar Função
        const resp = await removerDesafioService.execute(desafioId, uId);

        //Responder
        response.json(resp);

    }
}