import { Request, Response } from "express";
import { RegistarTreinadorService } from "../../../services/admin/treinadores/registarTreinadorService";


export class RegistarTreinadorController{
  async handle(request:Request, response:Response){
    const marcaId = request.params.id;
    let { email,nome,password,data_nasc,data_entrada,genero } = request.body;

    data_nasc = new Date(data_nasc);
    data_entrada = new Date(data_entrada)

    const registarTreinadorService = new RegistarTreinadorService();
    const resp = await registarTreinadorService.execute( { marcaId,email,nome,password,data_nasc,data_entrada,genero } )
    
    response.json(resp)
  }
}