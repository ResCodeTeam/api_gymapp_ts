import { Request, Response } from "express";
import { AddMusculoService } from "../../services/musculos/addMusculoService";

export class AddMusculoController{
  async handle(request:Request, response:Response){
    const {nome,imagem}=request.body;
    const addMusculoService = new AddMusculoService();
    const resp = addMusculoService.execute(nome,imagem);
    response.json(resp);
  }
}