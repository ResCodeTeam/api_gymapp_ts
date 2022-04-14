import { Request, Response } from "express";
import { RegistarTreinadorService } from "../../services/treinadores/registarTreinadorService";


export class RegistarTreinadorController{
  async handle(request:Request, response:Response){
    const marcaId = request.params.id;
    let { email,nome,password,dataNasc,dataEntrada,genero } = request.body;

    dataNasc = new Date(dataNasc);
    dataEntrada = new Date(dataEntrada)

    const registarTreinadorService = new RegistarTreinadorService();
    const resp = await registarTreinadorService.execute( { marcaId,email,nome,password,dataNasc,dataEntrada,genero } )
    
    response.json(resp)
  }
}