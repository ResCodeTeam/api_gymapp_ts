import { Request, Response } from "express";
import { RegistarAlunoService } from "../../services/alunos/registarAlunoService";

export class RegistarAlunoController {
    async handle(request: Request, response: Response){
      let donoId = request.params.adminId;
      let { email, nome, password, dataNasc, dataEntrada, genero, ginasioId } = request.body;
      if(email === undefined || nome === undefined || password === undefined || dataNasc === undefined || dataEntrada === undefined || genero === undefined || ginasioId === undefined){
        throw new Error("Pedido inválido")
      }

      dataNasc = new Date(dataNasc);
      dataEntrada = new Date(dataEntrada);
      const registarAlunoService = new RegistarAlunoService();
      const resp = await registarAlunoService.execute({email, nome, password, dataNasc, dataEntrada, genero, ginasioId, donoId});
      response.json(resp);
    }
}
