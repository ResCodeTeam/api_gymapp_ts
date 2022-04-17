import { Request, Response } from "express";
import { RegistarAdminService } from "../../services/admin/registarAdminService";

export class RegistarAdminController{
    async handle (request:Request, response:Response) {
    let { email,nome,password,dataNasc,dataEntrada,genero } = request.body;
    if(email === undefined || nome === undefined || password === undefined || dataNasc === undefined || dataEntrada === undefined || genero === undefined){
      throw new Error("Pedido inválido")
    }
    
    const registarAdminService = new RegistarAdminService();
    dataNasc = new Date(dataNasc);
    dataEntrada = new Date(dataEntrada);

    const resp = await registarAdminService.execute({email,nome,password,dataNasc,dataEntrada,genero});
  
    response.status(200).json(resp);
  
  }
}
  