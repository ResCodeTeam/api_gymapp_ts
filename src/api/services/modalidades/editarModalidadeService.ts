import { checkDonoGinasio, checkGinasioExists, checkModalidadeExists, checkModalidadeNome, getModalidadeGinasio } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
interface IEditarModalidades{
    
  modalidadeId: string,
    imagemUrl: string,
    nome:string,
    ginasioId:string,
    uid:string,
}

export class EditarModalidadesService {
  async execute({imagemUrl, nome,modalidadeId, ginasioId,uid} : IEditarModalidades) {
    const exists_dst = await checkModalidadeExists(modalidadeId);
    if (!exists_dst) {
      throw new Error("A modalidade não existe");
    }

    console.log(ginasioId)
    const existsGinasio = await checkGinasioExists(ginasioId);
    if(!existsGinasio){
      throw new Error("Ginasio não existe")
    }

    const isAutor = await checkDonoGinasio(ginasioId, uid);
    if(!isAutor){
      throw new Error("Não possui autorização")
    }

    const exist_nome = await checkModalidadeNome(nome, ginasioId);
    if (exist_nome) {
      throw new Error("A modalidade já existe");
    }
    
    let ginasio = await getModalidadeGinasio(modalidadeId);
    if(ginasio == ginasioId){
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
    else{
      throw new Error("A modalidade não pertence ao ginásio")
    }    
  }
}