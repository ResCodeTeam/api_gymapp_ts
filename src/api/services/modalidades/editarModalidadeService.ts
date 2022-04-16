import { client } from "../../prisma/client";
interface IEditarModalidades{
    
  modalidadeId: string,
    imagemUrl: string,
    nome:string,
}

export class EditarModalidadesService {
  async execute({imagemUrl, nome,modalidadeId} : IEditarModalidades) {
      const editarModalidades = await client.modalidades_ginasio.update({
          where : {
              modalidade_id:modalidadeId
          },
          data : {
              modalidade_id:modalidadeId,
              imagem_url:imagemUrl,
              nome:nome
          }
      })

  
      return editarModalidades;    
  }
}