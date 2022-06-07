/**
 * @module EditarPlanoTreinoService
 */

import { checkPlanoTreinoExists, getTreinadorMarca, getTreinadorPlano } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
import { Bloco } from "../../Providers/blocoProvider";
import { CriarPlanoTreinoService } from "./criarPlanoTreinoService";

/**
 * @param planoId id do plano de treino
 * @param alunoId id do aluno
 * @param treinadorId id do treinador
 * @param data data do treino
 * @param modalidadeId id da modalidade
 * @param blocos blocos do plano de treino
 */
export interface IEditarPlano {
  planoId: string;
  alunoId: string;
  treinadorId: string;
  data: Date;
  modalidadeId: string;
  blocos: Array<Bloco>;
}

/**
 * Classe responsavel pelo serviço de edição dos planos de treino
 */
export class EditarPlanoTreinoService {
  /**
   * Método que permite editar um plano de treino tendo em conta todas as verificações necessárias
   * @param IEditarPlano dados do plano de treino
  
   */
  async execute({ planoId, alunoId, treinadorId, data, modalidadeId, blocos }: IEditarPlano) {
    const existsPlano = await checkPlanoTreinoExists(planoId);
    if (!existsPlano) {
      return { data: "Plano de treino não existe", status: 500 }
    }

    const autor = await getTreinadorPlano(planoId);
    const marca_treinador_plano = await getTreinadorMarca(autor)
    const marca_treinador = await getTreinadorMarca(treinadorId)

    if (marca_treinador_plano != marca_treinador) {
      return { data: "Não tem autorização", status: 500 }
    }

    await client.planos_treino.delete({
      where: {
        plano_treino_id: planoId
      }
    })

    const criarPlanoTreinoService = new CriarPlanoTreinoService();
    const resp = await criarPlanoTreinoService.execute({ alunoId, treinadorId, data, modalidadeId, blocos })


    return { data: resp, status: 200 };

  }
}