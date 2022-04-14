import { Request, Response } from "express";
import { RegistarCpService } from "../../services/backend/registarCpService";

export class RegistarCpController{
    async handle(request:Request, response:Response){
        const {cp,cpExt,rua, localidade} = request.body
        console.log("aqui")
        const registarCpService = new RegistarCpService()
        const resp = await registarCpService.execute({cp,cpExt,rua,localidade})
        response.json(resp)
    }
}