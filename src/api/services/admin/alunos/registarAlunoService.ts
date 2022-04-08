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
    console.log(email,
      nome,
      password,
      dataNasc,
      dataEntrada,
      genero,
      ginasioId,)
    if (existsEmail) {
      throw new Error("Email já registado!");
    }

    if(password.length<5){
      throw new Error("Nome inválido");
    }

    if(!email.includes("@")){
      throw new Error("Email inválido")
    }

    if(genero != 0 && genero != 1 ){
      throw new Error("Email inválido")
    }

    // Obter tag do aluno
    const hashtag = await getTag(nome);

    //encriptar a password do aluno
    let passwd = await hash(password, 8);

    // obter o id da função
    const funcaoId = await getFuncaoId("Aluno");

    let existsGym = await checkGinasioExists(ginasioId);
    
    if (!existsGym) {
      throw new Error("Ginásio não existe");
    }
    
    if(nome.split(" ").length<2){
      throw new Error("Nome inválido")
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

      if (marcaMobilidade) {
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
      return { msg: "Aluno Registado",aluno };
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
