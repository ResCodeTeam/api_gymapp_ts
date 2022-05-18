import { client } from "../../prisma/client";
import { checkModalidadeNome, checkGinasioExists, checkDonoGinasio } from "../../helpers/dbHelpers";

interface ICriarGinasioModalidadesService {
  ginasioId: string;
  nome: string;
  imagemUrl: string;
  adminId: string;
}

class CriarGinasioModalidadesService {
  async execute({
    ginasioId,
    nome,
    imagemUrl,
    adminId
  }: ICriarGinasioModalidadesService) {
    
    const exist_ginasio = await checkGinasioExists(ginasioId);
    if (!exist_ginasio) {
      throw new Error("O ginásio não existe");
    }

    await checkDonoGinasio(ginasioId, adminId);

    const exist_nome = await checkModalidadeNome(nome, ginasioId);
    if (exist_nome) {
      throw new Error("A modalidade já existe");
    }

    const modalidade = await client.modalidades_ginasio.create({
      data: {
        ginasio_id: ginasioId,
        nome,
        imagem_url: imagemUrl,    
      },
    });
    return {data: modalidade, status: 200};
  }
}
export { CriarGinasioModalidadesService };
