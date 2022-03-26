import { checkDonoMarca, checkMarcaExists, checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from '../../../prisma/client'; 

interface INotificacaoMarca {
  userId: string,
  marcaId: string,
  conteudo: string,
  data : Date,
  tipo: number
}

export class CriarNotificacaoMarcaService {
  async execute({userId, marcaId, conteudo, data, tipo} : INotificacaoMarca) {
    //#region Verifica se o admin existe
    const existsUser = await checkUserIdExists(userId);
    if (!existsUser) {
      throw new Error("User não existe");
    }
    //#endregion

    //#region  Verifica se a marca existe
    const existsMarca = await checkMarcaExists(marcaId);
    if (!existsMarca) {
      throw new Error("Marca não existe");
    }
    //#endregion

    //#region  Verifica se o admin é dono da marca
    const checkMarcaAdmin = await checkDonoMarca(marcaId, userId);
    //await models.marcas.findAll({ where: {marca_id: marcaId, dono_id: user_id}});
    if (!checkMarcaAdmin) {
      throw new Error("Não tem permições nesta marca");
    }
    //#endregion

    //#region Procurar todos os Alunos de uma Marca
    const ginasios = await client.ginasio.findMany({
      where : {
        marca_id : marcaId
      },
      select : {
        marca_id : true,
        ginasio_id : true,
        aluno_ginasio : {
          select : {
            user_id : true,
            users : {
              select : {
                nome : true
              }
            }
          }
        }
      }
    });
    //#endregion

    ///Verificar se existe ginásios
    if (!ginasios) {
      throw new Error (`Não existe alunos`);
    }

    console.log(ginasios[0].aluno_ginasio);
    
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
          data : {
            noti_id : notificacao.noti_id,
            dest_uid: ginasios[i].aluno_ginasio[j].user_id
          }
        });
      }
    }
    
    if (!dstNoti) {
      throw new Error (`Não contém alunos`)
    } 
    //#endregion
    
    return {
      message:"Notificação enviada com sucesso",
      ginasios
    };
  }
}