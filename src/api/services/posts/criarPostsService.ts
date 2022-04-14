import { client } from "../../prisma/client";

interface ICriarPostsService {
  criadorId: string;
  data: Date;
  descricao: string;
  tipo: number;
  ginasioId: string;
  identificacao: Array<string>;
}

class CriarPostsService {
  async execute({
    criadorId,
    data,
    descricao,
    tipo,
    ginasioId,
    identificacao
  }: ICriarPostsService) {
    if ((criadorId != null && ginasioId != null) || (criadorId == null && ginasioId == null)) {
      // enviar erro - ou é de um ou é de outro
      throw new Error("Impossível criar post!");
    } else {
      
      const post = await client.publicacoes.create({
        data: {
          criador_id: criadorId,
          data,
          descricao,
          tipo,
          ginasio_id: ginasioId,
       }
      })
      if(identificacao!=null && identificacao.length>0){
        for(let i = 0; i < identificacao.length; i++){
          await client.identificacoes_publicacoes.create({
              data:{

              publicacao_id:post.publicacao_id,
              usersuid:identificacao[i]
          }})
        }
      }
      return { post};
    } 
  }
}

export { CriarPostsService }
