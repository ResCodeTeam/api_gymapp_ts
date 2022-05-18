import { client } from "../../prisma/client";
import { hash } from "bcrypt";
import { getTag } from "../../helpers/tagHelpers";
import {
  checkEmail,
  getFuncaoId,
  checkGinasioExists,
  getMarcaGym,
  checkDonoGinasio,
} from "../../helpers/dbHelpers";

interface IRegistarAlunoService {
  email: string;
  nome: string;
  password: string;
  dataNasc: Date;
  dataEntrada: Date;
  genero: number;
  ginasioId: string;
  donoId: string;
}


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
    // verificar se o aluno já está registado
    const existsEmail = await checkEmail(email);
    if (existsEmail) {
      return { date: "Email já registado!", status: 500 }
    }

    if (password.length < 5) {
      return { date: "Nome inválido", status: 500 }
    }

    if (!email.includes("@")) {
      return { date: "Email inválido", status: 500 }
    }

    if (genero != 0 && genero != 1) {
      return { date: "Email inválido", status: 500 }
    }

    // Obter tag do aluno
    const hashtag = await getTag(nome);

    //encriptar a password do aluno
    let passwd = await hash(password, 8);

    // obter o id da função
    const funcaoId = await getFuncaoId("Aluno");
    let existsGym = await checkGinasioExists(ginasioId);
    if (!existsGym) {
      return { date: "Ginásio não existe", status: 500 }
    }

    await checkDonoGinasio(ginasioId, donoId)

    if (nome.split(" ").length < 2) {
      return { date: "Nome inválido", status: 500 }
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
      return aluno;
    } catch (e) {
      client.users.delete({
        where: {
          uid,
        },
      });
      throw e;
    }
  }
}
