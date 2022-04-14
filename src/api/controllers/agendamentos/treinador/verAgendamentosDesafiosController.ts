import { Request, Response } from "express";
import { VerAgendamentosDesafiosService } from "../../../services/agendamentos/treinador/verAgendamentosDesafiosService";

export class VerAgendamentosDesafiosController{
    async handle(request:Request,response:Response){

        const verAgendamentosDesafiosService = new VerAgendamentosDesafiosService();
        const resp = await verAgendamentosDesafiosService.execute();
        response.json(resp)
    }
}