import { Request, Response } from "express";
import { RegistarTreinadorService } from "../../services/treinadores/registarTreinadorService";


export class RegistarTreinadorController{
  async handle(request:Request, response:Response){
    const marcaId = request.params.id;
    const userId = request.params.adminId;
    let { email,nome,password,dataNasc,dataEntrada,genero } = request.body;
    if(email === undefined || nome === undefined || password === undefined || dataNasc === undefined || dataEntrada === undefined || genero === undefined){
      throw new Error("Pedido inválido")
    }

    dataNasc = new Date(dataNasc);
    dataEntrada = new Date(dataEntrada)

    const registarTreinadorService = new RegistarTreinadorService();
    const resp = await registarTreinadorService.execute( { marcaId,email,nome,password,dataNasc,dataEntrada,genero, userId } )
    
    response.json(resp.data).status(resp.status);
  }
}