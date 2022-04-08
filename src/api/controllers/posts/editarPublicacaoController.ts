import { Request, Response} from "express";
import { EditarPublicacaoService } from "../../services/posts/editarPublicacoesService";

export class EditarPublicacaoController{
  async handle(request : Request, response : Response) {
      const postId = request.params.id;
      const { publicacaoId, data, descricao, tipo, ginasioId } = request.body;
      let newData = new Date(data);
      const editarPublicacaoController = new EditarPublicacaoService();


      const resp = await editarPublicacaoController.execute({
        publicacaoId, 
        newData, 
        descricao
      });

      console.log(resp);
      response.status(200).json({
        'message': resp
      });
  }
}
