import { Request, Response } from "express";
import { RegistarFuncoesService } from "../../services/backend/registarFuncoesService";

export class RegistarFuncoesController {

    async handle(request: Request, response: Response) {
        let { nome } = request.body;

        try{
            if (nome === undefined) {
                throw new Error("Pedido inválido")
            }
    
            const registarFuncoesService = new RegistarFuncoesService();
            const resp = await registarFuncoesService.execute(nome);
    
            response.status(resp.status).json(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        }
    }
}