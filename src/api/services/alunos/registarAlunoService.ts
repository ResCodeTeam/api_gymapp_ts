/**
 * @module RegistarAlunoService
 */
import { client } from "../../prisma/client";
import { hash } from "bcrypt";
import { getTag } from "../../helpers/tagHelpers";
import {
  checkEmail,
  getFuncaoId,
  checkGinasioExists,
  getMarcaGym,
  checkDonoGinasio,
  checkUserIdExists,
} from "../../helpers/dbHelpers";

/**
 * @param email email que o aluno deseja ter
 * @param nome nome do aluno
 * @param password password que o aluno deseja ter
 * @param dataNasc data de nascimento do aluno do post
 * @param dataEntrada data em que o aluno se juntou à aplicação
 * @param genero genero do aluno
 * @param ginasioId id do ginásio onde o aluno vai ser inserido
 * @param donoId id do dono do ginásio
 */
export interface IRegistarAlunoService {
  email: string;
  nome: string;
  password: string;
  dataNasc: Date;
  dataEntrada: Date;
  genero: number;
  ginasioId: string;
  donoId: string;
}

/**
 * Classe responsavel pelo serviço de criação de um aluno
 */
export class RegistarAlunoService {
  async execute({
    email,
    nome,
    password,
    dataNasc,
    dataEntrada,
    genero,
    ginasioId,
    donoId
  }: IRegistarAlunoService) {
    const existsAdmin = await checkUserIdExists(donoId);
    if (!existsAdmin) {
      return { data: "Utilizador inexistente", status: 500 }
    }

    let existsGym = await checkGinasioExists(ginasioId);
    if (!existsGym) {
      return { data: "Ginásio não existe", status: 500 }
    }

    const marcaAdmin = await checkDonoGinasio(donoId, ginasioId);
    if (!marcaAdmin) {
      return { data: "Não tem permissão para registar alunos neste ginásio", status: 500 }
    }

    // verificar se o aluno já está registado
    const existsEmail = await checkEmail(email);
    if (existsEmail) {
      return { data: "Email já registado!", status: 500 }
    }

    if (password.length < 5) {
      return { data: "Nome inválido", status: 500 }
    }

    if (!email.includes("@")) {
      return { data: "Email inválido", status: 500 }
    }

    if (genero != 0 && genero != 1) {
      return { data: "Email inválido", status: 500 }
    }

    // Obter tag do aluno
    const hashtag = await getTag(nome);

    //encriptar a password do aluno
    let passwd = await hash(password, 8);

    // obter o id da função
    const funcaoId = await getFuncaoId("Aluno");


    await checkDonoGinasio(ginasioId, donoId)

    if (nome.split(" ").length < 2) {
      return { data: "Nome inválido", status: 500 }
    }

    const aluno = await client.users.create({
      data: {
        email,
        nome,
        password: passwd,
        data_nasc: dataNasc,
        hashtag,
        data_entrada: dataEntrada,
        genero,
        funcoes: {
          connect: {
            funcao_id: funcaoId
          }
        }
      },
    });

    const uid = aluno.uid;
    try {
      const marca = await getMarcaGym(ginasioId);
      const marcaMobilidade = marca?.mobilidade;
      const marcaId = marca?.marca_id

      if (marcaMobilidade) {
        await client.alunos_marca.create({
          data: {
            marcas: {
              connect: {
                marca_id: marcaId
              }
            },
            users: {
              connect: {
                uid
              }
            }
          },
        });
      } else {
        await client.aluno_ginasio.create({
          data: {
            ginasio: {
              connect: {
                ginasio_id: ginasioId
              }
            },
            users: {
              connect: {
                uid
              }
            }
          },
        });
      }
      await client.definicoes_user.create({
        data: {
          identificacoes: true,
          is_privado: false,
          mencoes: true,
          usersuid: aluno.uid
        }
      })
      return { data: aluno, status: 200 };
    } catch (e) {
      client.users.delete({
        where: {
          uid,
        },
      });
      return { data: "Erro ao registar aluno", status: 500 };
    }
  }
}
