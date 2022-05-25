import { Interface } from "readline";
import { checkMarcaExists, checkUserIdExists, getDonoMarca, getFuncaoId, getMarcaGym, getTreinadorMarca, getUserFuncao } from "../../helpers/dbHelpers";

import { client } from '../../prisma/client';

interface IAlunoMarca {
  marcaId: string,
  userId: string
}

export class ObterAlunosMarcaService {
  async execute({ marcaId, userId }: IAlunoMarca) {


    const existsMarca = await checkMarcaExists(marcaId);
    if (!existsMarca) {
      return { data: "Marca não existe", status: 500 }
    }

    const existsUser = await checkUserIdExists(userId)
    if (!existsUser) {
      return { data: "User não existe", status: 500 }
    }




    const alunosMarca = await client.alunos_marca.findMany({
      where: {
        marca_id: marcaId
      },
      select: {
        users: {
          select: {
            uid: true,
            nome: true,
            hashtag: true,
            imagem_url: true
          }
        }
      }
    });

    const alunosGinasio = await client.aluno_ginasio.findMany({
      where: {
        ginasio: {
          marca_id: marcaId
        }
      },
      select: {
        users: {
          select: {
            uid: true,
            nome: true,
            hashtag: true,
            imagem_url: true
          }
        }
      }
    });

    if (alunosMarca.length == 0) {
      return { data: "Não foi encontrado nenhum aluno", status: 500 }
    }

    let users = [...alunosGinasio, ...alunosMarca]

    return { data: users, status: 200 };
  }
}