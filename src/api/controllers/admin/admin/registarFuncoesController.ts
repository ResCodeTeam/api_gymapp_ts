import { Request, Response } from "express";
import { RegistarFuncoesService } from "../../../services/admin/admin/registarFuncoesService";

export class RegistarFuncoesController{

    async handle(request:Request, response:Response){
        let {funcao} = request.body;

        const registarFuncoesService = new RegistarFuncoesService();
        const resp = await registarFuncoesService.execute(funcao);

        response.json(resp)
    }
}