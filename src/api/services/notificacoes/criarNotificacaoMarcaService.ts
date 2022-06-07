/**
 * @module CriarNotificacaoMarcaService
 */

import { changeTimeZone } from "../../helpers/dateHelpers";
import { checkDonoMarca, checkMarcaExists, checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from '../../prisma/client';

/**
 * @param userId id do utilizador
 * @param marcaId id da marca
 * @param conteudo conteudo da notificacao
 * @param tipo tipo da notificacao
 */
export interface INotificacaoMarca {
  userId: string,
  marcaId: string,
  conteudo: string,
  tipo: number
}

/**
 * Classe responsavel pelo serviço de criação de notificações para as marcas
 */
export class CriarNotificacaoMarcaService {
  /**
   * Método que permite criar uma notificação para uma marca tendo em conta todas as verificações necessárias
   * @param INotificacaoMarca dados da notificacao 
   * @returns 
   */
  async execute({ userId, marcaId, conteudo, tipo }: INotificacaoMarca) {
    //#region Verifica se o admin existe
    const existsUser = await checkUserIdExists(userId);
    if (!existsUser) {
      return { data: "User não existe", status: 500 }

    }
    //#endregion

    //#region  Verifica se a marca existe
    const existsMarca = await checkMarcaExists(marcaId);
    if (!existsMarca) {
      return { data: "Marca não existe", status: 500 }

    }
    //#endregion

    //#region  Verifica se o admin é dono da marca
    const checkMarcaAdmin = await checkDonoMarca(marcaId, userId);
    //await models.marcas.findAll({ where: {marca_id: marcaId, dono_id: user_id}});
    if (!checkMarcaAdmin) {
      return { data: "Não tem permições nesta marca", status: 500 }

    }
    //#endregion


    //#region Procurar todos os Alunos de uma Marca
    const ginasios = await client.ginasio.findMany({
      where: {
        marca_id: marcaId
      },
      select: {
        marca_id: true,
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

      return { data: `Não existe alunos`, status: 500 }
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
    for (let i = 0; i < ginasios.length; i++) {
      for (let j = 0; j < ginasios[i].aluno_ginasio.length; j++) {
        dstNoti = await client.destinos_notificacao.create({
          data: {
            noti_id: notificacao.noti_id,
            dest_uid: ginasios[i].aluno_ginasio[j].user_id
          }
        });
      }
    }

    console.log(ginasios)
    if (!dstNoti) {
      return { data: `Não contém alunos`, status: 500 }

    }
    //#endregion

    return { data: "Notificação enviada com sucesso", status: 200 };
  }
}