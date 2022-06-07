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
  /**
 * Método que permite inserir uma atividade na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param IAtividadeService interface de dados do serviço
 */
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
