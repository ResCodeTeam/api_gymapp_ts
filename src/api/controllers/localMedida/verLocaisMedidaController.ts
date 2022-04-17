import { Request, Response } from "express";
import { VerLocaisMedidaService } from "../../services/localMedida/verLocaisMedidaService";

export class VerLocaisMedidaController{
 
    async handle(request:Request,response:Response){
        const uId = response.locals.uid;

        const verLocaisMedidaService = new VerLocaisMedidaService();
        const resp = await verLocaisMedidaService.execute({uId});
        response.json(resp)
    }
}