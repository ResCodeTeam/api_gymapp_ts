import { Request, Response } from "express";
import { AddMusculoService } from "../../services/musculos/addMusculoService";

export class AddMusculoController{
  async handle(request:Request, response:Response){
    const {nome,image}=request.body;
    const addMusculoService = new AddMusculoService();
    const resp = await addMusculoService.execute(nome,image);
    response.json(resp);
  }
}