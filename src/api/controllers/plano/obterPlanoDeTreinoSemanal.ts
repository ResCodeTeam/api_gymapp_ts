import { Request, Response } from "express";
import { ObterPlanoTreinoSemanalService } from "../../services/plano/obterPlanoTreinoSemanalService";

export class ObterPlanoTreinoSemanalController{
  async handle(request:Request, response:Response){
    const uid = response.locals.uid;
    let {startDate, endDate} = request.body;

    startDate = new Date(startDate)
    endDate=new Date(endDate)
    const obterPlanoTreinoSemanalService = new ObterPlanoTreinoSemanalService();
    const resp = await obterPlanoTreinoSemanalService.execute(uid,startDate,endDate)
    response.json(resp)
    
  }
}