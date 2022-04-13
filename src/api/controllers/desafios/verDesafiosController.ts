import { Request, Response } from "express";
import { VerDesafioService } from "../../services/desafios/verDesafiosService";


export class VerDesafiosController{
 
    async handle(request:Request,response:Response){
        const desafioId = request.params.id;

        const verDesafioService = new VerDesafioService();
        const resp = await verDesafioService.execute(desafioId);
        response.json(resp)
    }
}