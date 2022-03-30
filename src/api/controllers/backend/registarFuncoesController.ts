import { Request, Response } from "express";
import { RegistarFuncoesService } from "../../services/backend/registarFuncoesService";

export class RegistarFuncoesController{

    async handle(request:Request, response:Response){
        let {nome} = request.body;

        const registarFuncoesService = new RegistarFuncoesService();
        const resp = await registarFuncoesService.execute(nome);

        response.json(resp)
    }
}