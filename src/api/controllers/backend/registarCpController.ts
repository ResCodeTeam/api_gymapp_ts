import { Request, Response } from "express";
import { RegistarCpService } from "../../services/backend/registarCpService";

export class RegistarCpController {
    async handle(request: Request, response: Response) {
        const { cp, cpExt, rua, localidade } = request.body

        try{
            if (cp === undefined || cpExt === undefined || rua === undefined || localidade === undefined) {
                throw new Error("Pedido inválido")
            }
    
            const registarCpService = new RegistarCpService()
            const resp = await registarCpService.execute({ cp, cpExt, rua, localidade })
            response.status(resp.status).json(resp.data);
        } catch (e) {
            response.status(500).json(e.message)
        } 
    }
}