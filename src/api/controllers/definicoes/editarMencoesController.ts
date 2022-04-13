import {Request, Response} from 'express' 
import { EditarMencoesService } from '../../services/definicoes/editarMencoesService';

export class EditarMencoesController{
  async handle(request:Request, response:Response){
    const uid = response.locals.uid;
    const {mencoes}=request.body;


    const editarMencoesService = new EditarMencoesService();
    const resp = await editarMencoesService.execute(uid,mencoes);

    response.json(resp)

  }
}