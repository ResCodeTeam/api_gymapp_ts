import { Request, Response } from "express";
import { VerTodasMarcasService } from "../../services/marcas/verTodasMarcasService";

export class VerTodasMarcasController{
 
    async handle(request:Request,response:Response){
        const donoId = response.locals.uid;

        const verTodasMarcasService = new VerTodasMarcasService();
        const resp = await verTodasMarcasService.execute({donoId});
        response.json(resp)
    }
}