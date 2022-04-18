import { Request, Response } from "express";
import { VerDesafioService } from "../../services/desafios/verDesafioService";


export class VerDesafioController{
 
    async handle(request:Request,response:Response){
        const desafioId = request.params.id;

        const verDesafioService = new VerDesafioService();
        const resp = await verDesafioService.execute(desafioId);
        response.json(resp)
    }
}