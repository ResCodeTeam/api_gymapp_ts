import { Request, Response } from "express";
import { VerUmGinasioService } from "../../services/ginasios/verUmGinasioService";



export class VerUmGinasioController{
 
    async handle(request:Request,response:Response){
        const donoId = response.locals.uid;
        const ginasioId = request.params.id;

        const verUmGinasioService = new VerUmGinasioService();
        const resp = await verUmGinasioService.execute(donoId, ginasioId);
        response.json(resp)
    }
}