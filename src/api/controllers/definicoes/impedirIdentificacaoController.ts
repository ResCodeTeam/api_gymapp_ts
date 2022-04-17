import {Request, Response} from 'express' 
import { ImpedirIdentificacaoService } from '../../services/definicoes/impedirIdentificacaoservice';


export class ImpedirIdentificacaoController{
  async handle(request:Request, response:Response){
    const uid = response.locals.uid;
    const {identificacoes}=request.body;
    if(identificacoes === undefined){
      throw new Error("Pedido inválido")
    }

    const impedirIdentificacaoService = new ImpedirIdentificacaoService();
    const resp = await impedirIdentificacaoService.execute(uid,identificacoes);

    response.json(resp)

  }
}