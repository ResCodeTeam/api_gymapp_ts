import { Request, Response } from "express";
import { RegistarAlunoService } from "../../../services/admin/alunos/registarAlunoService";

export class RegistarAlunoController {
    async handle(request: Request, response: Response){
      let { email, nome, password, dataNasc, dataEntrada, genero, ginasioId } = request.body;
    
      const RegistarAlunosController = new RegistarAlunoService();
      const resp = await RegistarAlunosController.execute({email, nome, password, dataNasc, dataEntrada, genero, ginasioId});
      return resp;
    }
}

export { RegistarAlunoService };
