import { Request, Response} from "express";
import { EditarPublicacaoService } from "../../services/posts/editarPublicacoesService";

export class EditarPublicacaoController{
  async handle(request : Request, response : Response) {
      
      const { publicacaoId, descricao} = request.body;
      if(publicacaoId === undefined || descricao === undefined){
        throw new Error("Pedido inválido")
      }
      let newData = new Date(Date.now());
      const editarPublicacaoController = new EditarPublicacaoService();


      const resp = await editarPublicacaoController.execute({
        publicacaoId, 
        newData, 
        descricao
      });

      console.log(resp);
      response.status(200).json({resp});
  }
}
