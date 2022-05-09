import { Request, Response } from "express";
import { VerUmaMarcaService } from "../../services/marcas/verUmaMarcaService";

export class VerUmaMarcaController{
 
    async handle(request:Request,response:Response){
        const donoId = response.locals.uid;
        const marcaId = request.params.id

        const verUmaMarcaService = new VerUmaMarcaService();
        const resp = await verUmaMarcaService.execute({donoId, marcaId});
        response.json(resp)
    }
}