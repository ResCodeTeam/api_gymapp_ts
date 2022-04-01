import { Request, Response} from "express";
import { RemoverDesafioService } from "../../../services/treinador/desafios/removerDesafioService";


export class RemoverDesafioController{
    async handle(request : Request, response : Response) {

        //Serviço
        const removerDesavioService = new RemoverDesafioService();

        //Pedir Id do desafio por parametro
        const desafioId = request.params.id;

        //Invocar Função
        const resp = await removerDesavioService.execute(desafioId);

        //Responder
        response.json(resp);

    }
}