import { client } from "../../../prisma/client";
import { hash } from "bcrypt";
import { getTag } from "../../../helpers/tagHelpers";
import {
  checkEmail,
  getFuncaoId,
  checkGinasioExists,
  getMarcaGym,
} from "../../../helpers/dbHelpers";

interface IRegistarAlunoService {
  email: string;
  nome: string;
  password: string;
  dataNasc: Date;
  dataEntrada: Date;
  genero: number;
  ginasioId: string;
}

//TODO: Receber Marca e Gym para inserir o aluno
export class RegistarAlunoService {
  async execute({
    email,
    nome,
    password,
    dataNasc,
    dataEntrada,
    genero,
    ginasioId,
  }: IRegistarAlunoService) {
    // verificar se o aluno já está registado
    const existsEmail = await checkEmail(email);
    if (existsEmail) {
      throw Error("Email já registado!");
    }

    // Obter tag do aluno
    const hashtag = await getTag(nome);

    //encriptar a password do aluno
    let passwd = await hash(password, 8);

    // obter o id da função
    const funcaoId = await getFuncaoId("Aluno");

    let existsGym = await checkGinasioExists(ginasioId);
    console.log(dataNasc,dataEntrada)
    if (!existsGym) {
      throw new Error("Ginásio não existe");
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
        funcoes:{
          connect:{
            funcao_id:funcaoId
          }
        }
      },
    });
    const uid = aluno.uid;
    try {
      const marca = await getMarcaGym(ginasioId);
      const marcaMobilidade = marca?.mobilidade;
      const marcaId = marca?.marca_id

      if (marcaMobilidade == 1) {
        await client.alunos_marca.create({
          data: {
            marcas:{
              connect:{
                marca_id:marcaId
              }
            },
            users:{
              connect:{
                uid
              }
            }
          },
        });
      } else {
        await client.aluno_ginasio.create({
          data: {
            ginasio:{
              connect:{
                ginasio_id:ginasioId
              }
            },
            users:{
              connect:{
                uid
              }
            }
          },
        });
      }
      return { msg: "Aluno Registado" };
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
