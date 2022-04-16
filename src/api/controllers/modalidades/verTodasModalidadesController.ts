import { Request, Response } from "express";
import { VerTodasModalidadesService } from "../../services/modalidades/verTodasModalidadesService";

export class VerTodasModalidadesController{
 
    async handle(request:Request,response:Response){
        const ginasioId = request.params.id;

        const verTodasModalidadesService = new VerTodasModalidadesService();
        const resp = await verTodasModalidadesService.execute({ginasioId});
        response.json(resp)
    }
}