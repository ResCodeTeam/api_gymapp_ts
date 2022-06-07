/**
 * @module CriarAtividadeService
 */
import { client } from "../../prisma/client";

/**
 * @param descricao descricao da atividade
 * @param icon icon que a atividade irá ter
 */
export interface IAtividadeService {
  descricao: string,
  icon: string,
}

/**
 * Classe responsavel pelo serviço de criação de uma atividade
 */
class CriarAtividadeService {
  async execute({
    descricao,
    icon
  }: IAtividadeService) {

    const atividade = await client.atividades.create({
      data: {
        descricao,
        icon,
      },
    });
    return { data: atividade, status: 200 };
  }
}
export { CriarAtividadeService };
