import { checkDonoMarca, checkMarcaExists, checkUserIdExists } from "../../../helpers/dbHelpers";

import { client } from '../../../prisma/client'; 

interface INotificacaoMarca {
  userId: string,
  marcaId: string,
  conteudo: string,
  data : Date,
  tipo: number
}

class CriarNotificacaoMarcaService {
  async execute({userId, marcaId, conteudo, data, tipo} : INotificacaoMarca) {

    //#region Verifica se o admin existe
    const exists_user = await checkUserIdExists(userId);
    if (!exists_user) {
      throw new Error("User não existe");
    }
    //#endregion

    //#region  Verifica se a marca existe
    const exists_marca = await checkMarcaExists(marcaId);
    if (!exists_marca) {
      throw new Error("Marca não existe");
    }
    //#endregion

    //#region  Verifica se o admin é dono da marca
    const check_marca_admin = await checkDonoMarca(marcaId, userId);
    //await models.marcas.findAll({ where: {marca_id: marcaId, dono_id: user_id}});
    if (!check_marca_admin) {
      throw new Error("Não tem permições nesta marca");
    }
    //#endregion

    //#region  Procurar todos os alunos de todos os ginásios de uma marca
    ///Procura todos os ginásios da marca
    let users = [];
    const ginasios = await client.ginasio.findMany({ 
      where:{
        marca_id: marcaId
      },
      select : {
        ginasio_id: true
      }
    });

    for (let i = 0; i < ginasios.length; i++) {
        //console.log(`Ginásio ${i} : ${ginasios[i].ginasio_id}`);
        /// Procura todos os alunos do ginásio
        const utilizadores = await client.aluno_ginasio.findMany({
          where: {
            ginasio_id: ginasios[i].ginasio_id
          }
        });
        for (let i = 0; i < utilizadores.length; i++) {
          users.push(utilizadores[i].user_id);
        }
    }
    //#endregion

    ///Verifica se não encontrou alunos
    if (users.length == 0) {
      throw new Error(`Não existem users inscritos`);
    }
    
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
    ///Get id da notificação
    //const notiId = notificacao.noti_id ["dataValues"]["noti_id"];
    let u = [];
    ///Cria um destino de notificação para cada aluno de ginásios de uma marca
    for (let i = 0; i < users.length; i++) {
      console.log(`Notificação: ${notificacao.noti_id} , User: ${users[i]}`);
      u.push(await client.destinos_notificacao.create({
        data : {
          noti_id : notificacao.noti_id,
          dest_uid: users[i],
        }
      }));
    }
    //#endregion

    for (let i = 0; i < u.length; i++) {
      console.log(u[i]);
      
    }

    return {
      message:"Notificação enviada com sucesso"
    };
  }
}


export { CriarNotificacaoMarcaService };