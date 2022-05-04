import { changeTimeZone } from "../../helpers/dateHelpers";
import { checkDonoGinasio, checkGinasioExists, checkUserIdExists, formatDate, formatDateHour } from "../../helpers/dbHelpers";
import { client } from '../../prisma/client';

interface INotificacaoGinasio {
  userId: string,
  ginasioId: string,
  conteudo: string,
  tipo: number
}

export class CriarNotificacaoGinasioService {
  async execute({ userId, ginasioId, conteudo, tipo }: INotificacaoGinasio) {
    console.log(userId, ginasioId)
    //#region Verifica se o admin existe
    const existsUser = await checkUserIdExists(userId);
    if (!existsUser) {
      throw new Error("User não existe");
    }
    //#endregion

    //#region  Verifica se a marca existe
    const existsGinasio = await checkGinasioExists(ginasioId);
    if (!existsGinasio) {
      throw new Error("Ginásio não existe");
    }
    //#endregion

    //#region  Verifica se o admin é dono da marca
    const checkGinasioAdmin = await checkDonoGinasio(ginasioId, userId);
    //await models.marcas.findAll({ where: {marca_id: marcaId, dono_id: user_id}});
    if (!checkGinasioAdmin) {
      throw new Error("Não tem permições nesta marca");
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
      throw new Error(`Não existe alunos`);
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

    console.log(`ID Notificação : ${notificacao.noti_id}`);
    console.log(`Data : ${(await formatDateHour(notificacao.data))}`);
    console.log(ginasios.aluno_ginasio);

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
      throw new Error(`Não contém alunos`)
    }
    //#endregion

    return {
      message: "Notificação enviada com sucesso",
      ginasios
    };
  }
}