/**
 * @module CriarNotificacaoGinasioService
 */

import { changeTimeZone } from "../../helpers/dateHelpers";
import { checkDonoGinasio, checkGinasioExists, checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from '../../prisma/client';

/**
 * @param userId id do utilizador
 * @param ginasioId id do ginasio
 * @param conteudo conteudo da notificacao
 * @param tipo tipo da notificacao
 */
export interface INotificacaoGinasio {
  userId: string,
  ginasioId: string,
  conteudo: string,
  tipo: number
}

/**
 * Classe responsavel pelo serviço de criação de notificações para os ginásios
 */
export class CriarNotificacaoGinasioService {
  /**
   * Método que permite criar uma notificação para um ginasio tendo em conta todas as verificações necessárias
   * @param INotificacaoGinasio dados da notificacao
  
   */
  async execute({ userId, ginasioId, conteudo, tipo }: INotificacaoGinasio) {
    //#region Verifica se o admin existe
    const existsUser = await checkUserIdExists(userId);
    if (!existsUser) {
      return { data: "User não existe", status: 500 }
    }
    //#endregion

    //#region  Verifica se a marca existe
    const existsGinasio = await checkGinasioExists(ginasioId);
    if (!existsGinasio) {
      return { data: "Ginásio não existe", status: 500 }
    }
    //#endregion

    //#region  Verifica se o admin é dono da marca
    const checkGinasioAdmin = await checkDonoGinasio(ginasioId, userId);
    //await models.marcas.findAll({ where: {marca_id: marcaId, dono_id: user_id}});
    if (!checkGinasioAdmin) {
      return { data: "Não tem permições nesta marca", status: 500 }
    }
    //#endregion

    //#region Procurar todos os Alunos de uma Marca
    const ginasios = await client.ginasio.findFirst({
      where: {
        ginasio_id: ginasioId
      },
      select: {
        ginasio_id: true,
        aluno_ginasio: {
          select: {
            user_id: true,
            users: {
              select: {
                nome: true
              }
            }
          }
        }
      }
    });
    //#endregion

    ///Verificar se existe ginásios
    if (!ginasios) {
      return { data: "Não existe alunos", status: 500 }
    }

    let data = new Date();
    changeTimeZone(data)

    //#region Cria Notificação
    const notificacao = await client.notificacoes.create({
      data: {
        origem_uid: userId,
        conteudo,
        data,
        tipo,
      }
    });
    //#endregion


    //#region Cria Destinos da Notificação
    let dstNoti;
    for (let i = 0; i < ginasios.aluno_ginasio.length; i++) {
      dstNoti = await client.destinos_notificacao.create({
        data: {
          noti_id: notificacao.noti_id,
          dest_uid: ginasios.aluno_ginasio[i].user_id
        }
      });
    }

    if (!dstNoti) {
      return { data: "Não contém alunos", status: 500 }
    }
    //#endregion

    return {
      data: {
        message: "Notificação enviada com sucesso",
        ginasios
      },
      status: 200
    };
  }
}