import { client } from "../../../prisma/client";

interface ICriarPostsService {
  criadorId: string;
  data: Date;
  descricao: string;
  tipo: number;
  ginasioId: string;
}

class CriarPostsService {
  async execute({
    criadorId,
    data,
    descricao,
    tipo,
    ginasioId,
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
        },
      });
      return { msg: "post criado com sucesso!",  post};
    } 
  }
}

export { CriarPostsService }
