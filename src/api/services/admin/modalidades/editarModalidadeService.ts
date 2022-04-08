import { client } from "../../../prisma/client";

import { NOMEM } from "dns";


interface IEditarModalidades{
    
  modalidadeId: string,
    imagemUrl: string,
    nome:string,
}

export class EditarModalidadesService {
  async execute({imagemUrl, nome,modalidadeId} : IEditarModalidades) {
      const editarModalidades = await client.modalidades_ginasio.updateMany({
          where : {
              modalidade_id:modalidadeId
          },
          data : {
              modalidade_id:modalidadeId,
              imagem_url:imagemUrl,
              nome:nome
          }
      })

  
      return {
          message:"Notificação alterada com sucesso",
          
        };
      
  }
}