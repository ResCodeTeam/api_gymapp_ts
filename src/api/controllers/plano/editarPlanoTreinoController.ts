import { Request, Response } from "express";
import { EditarPlanoTreinoService } from "../../services/plano/editarPlanoTreinoService";

export class EditarPlanoTreinoController{
  async handle(request:Request,response:Response){
    const treinadorId = response.locals.uid;
    const planoId = request.params.id;
    const { alunoId, modalidadeId, blocos } = request.body;
    console.log(request.body)
    const data = new Date(Date.now())
    const editarPlanoTreinoService = new EditarPlanoTreinoService();
    const resp = await editarPlanoTreinoService.execute({planoId,alunoId,treinadorId, modalidadeId, blocos, data})
    response.json(resp)
  }
}