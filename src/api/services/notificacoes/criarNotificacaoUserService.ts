/**
 * @module CriarNotificacaoUserService
 */

import { changeTimeZone } from "../../helpers/dateHelpers";
import { checkDonoMarca, checkUserIdExists, getAlunoMarca } from "../../helpers/dbHelpers"
import { client } from "../../prisma/client";

/**
 * @param destinoId id do destino
 * @param origemId id do origem
 * @param conteudo conteudo da notificacao
 * @param tipo tipo da notificacao
 */
export interface ICriarNotifcacaoUser {
  destinoId: string
  origemId: string,
  conteudo: string,
  tipo: number
}

/**
 * Classe responsavel pelo serviço de criação de notificações para os alunos
 */
export class CriarNotificacaoUserService {
  /**
   * Método que permite criar uma notificação para um aluno
   * @param ICriarNotifcacaoUser dados da notificacao 
  
   */
  async execute({ destinoId, origemId, conteudo, tipo }: ICriarNotifcacaoUser) {

    const existsDestino = await checkUserIdExists(destinoId);
    if (!existsDestino) {
      return { data: "User inexistente", status: 500 }
    }

    const marcaId = await getAlunoMarca(destinoId);
    const isDono = await checkDonoMarca(marcaId, origemId);

    let data = new Date();
    changeTimeZone(data)

    const notificacao = await client.notificacoes.create({
      data: {
        origem_uid: origemId,
        conteudo,
        data,
        tipo,
      }
    });


    await client.destinos_notificacao.create({
      data: {
        dest_uid: destinoId,
        noti_id: notificacao.noti_id
      }
    })

    return { data: notificacao, status: 200 };
  }
}