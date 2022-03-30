import { Request, Response } from "express";
import { AgendarAvaliacaoService } from "../../../services/admin/alunos/registarAlunoService";

export class AgendarAvaliacaoController {
    async handle(request: Request, response: Response){
      let 
      let { email, nome, password, dataNasc, dataEntrada, genero, ginasioId } = request.body;
      
      dataNasc = new Date(dataNasc);
      dataEntrada = new Date(dataEntrada);
      const registarAlunoService = new RegistarAlunoService();
      const resp = await registarAlunoService.execute({email, nome, password, dataNasc, dataEntrada, genero, ginasioId});
      response.json(resp);
    }
}
