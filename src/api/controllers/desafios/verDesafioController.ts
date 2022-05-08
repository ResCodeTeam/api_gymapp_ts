import { Request, Response } from "express";
import { VerDesafioService } from "../../services/desafios/verDesafioService";


export class VerDesafioController{
 
    async handle(request:Request,response:Response){
        const uId = response.locals.uid;
        const desafioId = request.params.id;

        const verDesafioService = new VerDesafioService();
        const resp = await verDesafioService.execute(uId, desafioId);
        response.json(resp)
    }
}