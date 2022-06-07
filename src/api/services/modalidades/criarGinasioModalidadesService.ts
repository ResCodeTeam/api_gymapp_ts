/**
 * @module CriarGinasioModalidadesService
 */

import { client } from "../../prisma/client";
import { checkModalidadeNome, checkGinasioExists, checkDonoGinasio } from "../../helpers/dbHelpers";

/**
 * @param ginasioId ginasio id
 * @param nome nome
 * @param imagemUrl imagem url
 * @param adminId id do admin
 */
export interface ICriarGinasioModalidadesService {
  ginasioId: string;
  nome: string;
  imagemUrl: string;
  adminId: string;
}

/**
 * Classe responsavel pelo serviço de criação de modalidades
 */
class CriarGinasioModalidadesService {
  async execute({
    ginasioId,
    nome,
    imagemUrl,
    adminId
  }: ICriarGinasioModalidadesService) {

    const exist_ginasio = await checkGinasioExists(ginasioId);
    if (!exist_ginasio) {
      return { data: "O ginásio não existe", status: 500 }
    }

    await checkDonoGinasio(ginasioId, adminId);

    const exist_nome = await checkModalidadeNome(nome, ginasioId);
    if (exist_nome) {
      return { data: "A modalidade já existe", status: 500 }
    }

    const modalidade = await client.modalidades_ginasio.create({
      data: {
        ginasio_id: ginasioId,
        nome,
        imagem_url: imagemUrl,
      },
    });
    return { data: modalidade, status: 200 };
  }
}
export { CriarGinasioModalidadesService };
