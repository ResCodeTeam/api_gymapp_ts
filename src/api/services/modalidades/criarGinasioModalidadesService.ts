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
      return { date: "O ginásio não existe", status: 500 }
    }

    await checkDonoGinasio(ginasioId, adminId);

    const exist_nome = await checkModalidadeNome(nome, ginasioId);
    if (exist_nome) {
      return { date: "A modalidade já existe", status: 500 }
    }

    const modalidade = await client.modalidades_ginasio.create({
      data: {
        ginasio_id: ginasioId,
        nome,
        imagem_url: imagemUrl,
      },
    });
    return modalidade;
  }
}
export { CriarGinasioModalidadesService };
