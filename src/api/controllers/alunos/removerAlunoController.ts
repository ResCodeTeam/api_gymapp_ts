import { RemoverAlunoService } from "../../services/alunos/removerAlunoService";
import { Request, Response } from "express";


export class RemoverAlunoController{
    async handle(request : Request, response : Response){
        const uId = response.locals.uid;

        const removerAlunoService = new RemoverAlunoService();
        const resp = await removerAlunoService.execute(uId);
        response.json(resp);
      };
}

