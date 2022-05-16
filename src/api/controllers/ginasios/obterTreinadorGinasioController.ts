import { Request, Response } from "express";
import { VerTreinadorGinasioService } from "../../services/ginasios/obterTreinadoresGinasioService";

export class VerTreinadorGinasioController{
 
    async handle(request:Request,response:Response){
        const uId = request.params.adminId;
        const marcaId = request.params.id;

        const verTreinadorGinasioService = new VerTreinadorGinasioService();
        const resp = await verTreinadorGinasioService.execute(uId, marcaId);
        response.json(resp)
    }
}