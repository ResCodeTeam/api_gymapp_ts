import { changeTimeZone } from "../../helpers/dateHelpers";
import { checkDonoMarca, checkMarcaExists, checkModalidadeExists, checkUserIdExists, formatDateHour, getMobilidadeMarca } from "../../helpers/dbHelpers";
import { client } from '../../prisma/client';

interface INotificacaoMarca {
  userId: string,
  marcaId: string,
  conteudo: string,
  tipo: number
}

export class CriarNotificacaoMarcaService {
  async execute({ userId, marcaId, conteudo, tipo }: INotificacaoMarca) {
    //#region Verifica se o admin existe
    const existsUser = await checkUserIdExists(userId);
    if (!existsUser) {
      return { date: "User não existe", status: 500 }
    }
    //#endregion

    //#region  Verifica se a marca existe
    const existsMarca = await checkMarcaExists(marcaId);
    if (!existsMarca) {
      return { date: "Marca não existe", status: 500 }
    }
    //#endregion

    //#region  Verifica se o admin é dono da marca
    const checkMarcaAdmin = await checkDonoMarca(marcaId, userId);
    //await models.marcas.findAll({ where: {marca_id: marcaId, dono_id: user_id}});
    if (!checkMarcaAdmin) {
      return { date: "Não tem permições nesta marca", status: 500 }
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
      return { date: "Não existe alunos", status: 500 }
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

    if (!dstNoti) {
      return { date: "Não contém alunos", status: 500 }
    }
    //#endregion

    return {
      message: "Notificação enviada com sucesso",
      ginasios
    };
  }
}