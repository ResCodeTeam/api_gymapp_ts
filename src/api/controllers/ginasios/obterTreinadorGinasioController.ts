import { Request, Response } from "express";
import { VerTreinadorGinasioService } from "../../services/ginasios/obterTreinadoresGinasioService";

export class VerTreinadorGinasioController{
 
    async handle(request:Request,response:Response){
        const marcaId = request.params.id;

        const verTreinadorGinasioService = new VerTreinadorGinasioService();
        const resp = await verTreinadorGinasioService.execute(marcaId);
        response.json(resp)
    }
}