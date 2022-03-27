import { Request, Response } from "express";
import { RegistarAdminService } from "../../../services/admin/admin/registarAdminService";

export class RegistarAdminController{
    async handle (request:Request, response:Response) {
    let { email,nome,password,data_nasc,data_entrada,genero } = request.body;
    
    // const registarAdminService = new RegistarAdminService();
    // data_nasc = new Date(data_nasc);
    // data_entrada = new Date(data_entrada);

    // const resp = await registarAdminService.execute({email,nome,password,data_nasc,data_entrada,genero});
  
    // response.status(200).json(resp);
  
  }
}
  