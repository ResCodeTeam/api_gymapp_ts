import { Request, Response } from "express";
import { VerTodosGinasiosService } from "../../services/ginasios/verTodosGinasiosService";

export class VerTodosGinasiosController{
 
    async handle(request:Request,response:Response){
        const marcaId = request.params.id;

        const verTodosGinasiosService = new VerTodosGinasiosService();
        const resp = await verTodosGinasiosService.execute({marcaId});
        response.json(resp)
    }
}