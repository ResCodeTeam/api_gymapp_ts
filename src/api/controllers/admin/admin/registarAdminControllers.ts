import { Request, Response } from "express";
import { RegistarAdminService } from "../../../services/admin/admin/registarAdminService";

export class RegistarAdminController{
    async handle (request:Request, response:Response) {
    let { email,nome,password,dataNasc,dataEntrada,genero } = request.body;
    
    const registarAdminService = new RegistarAdminService();
    dataNasc = new Date(dataNasc);
    dataEntrada = new Date(dataEntrada);

    const resp = await registarAdminService.execute({email,nome,password,dataNasc,dataEntrada,genero});
  
    response.status(200).json(resp);
  
  }
}
  