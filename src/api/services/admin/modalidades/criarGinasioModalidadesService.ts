import { client } from "../../../prisma/client";
import { checkModalidadeNome } from "../../../helpers/dbHelpers";

interface ICriarGinasioModalidadesService {
  ginasioId: string;
  nome: string;
  imagemUrl: string;
  
}

class CriarGinasioModalidadesService {
  async execute({
    ginasioId,
    nome,
    imagemUrl,
    
  }: ICriarGinasioModalidadesService) {
    //verificar se a modalidade já existe
    const exist_nome = await checkModalidadeNome(nome);
    if (exist_nome) {
      throw new Error("A modalidade já existe");
    }

    await client.modalidades_ginasio.create({
      data: {
        ginasio_id: ginasioId,
        nome,
        imagem_url: imagemUrl,    
      },
    });
    return { msg: "A modalidade foi criada com sucesso!" };
  }
}
export { CriarGinasioModalidadesService };
