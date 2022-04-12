import { Request, Response } from "express";

export class AddMusculoController{
  async handle(request:Request, response:Response){
    const {nome,imagem}=request.body;
    //const addMusculoService = new AddMusculoService();
    const resp = 
}