import { hash } from "bcrypt";
import { checkEmail, checkMarcaExists, getFuncaoId } from "../../helpers/dbHelpers";
import { getTag } from "../../helpers/tagHelpers";
import { client } from "../../prisma/client";

interface IRegistarTreinadorService{
  marcaId:string,
  email:string,
  nome:string,
  password:string,
  data_nasc:Date,
  data_entrada:Date,
  genero:number,
}

export class RegistarTreinadorService{
  async execute({marcaId,email,nome,password,data_nasc,data_entrada,genero}:IRegistarTreinadorService){
    // verificar se o aluno já está registado
    let existsEmail = await checkEmail(email);
    if(existsEmail){
        throw Error("Email já registado!")
    }
    
    let existsMarca = await checkMarcaExists(marcaId);
    if(!existsMarca){
      throw new Error("Marca não existe")
    }

    // Obter tag do aluno
    let hashtag = await getTag(nome);

    //encriptar a password do aluno
    let passwd = await hash(password, 8);
    
    // obter o id da função
    let funcaoId = await getFuncaoId("Treinador")

    const treinador = await client.users.create({
      data:{

          email,
          nome,
          password:passwd,
          data_nasc,
          hashtag,
          data_entrada,
          genero,
          funcao_id:funcaoId,
          
      }
    })
    await client.treinadores_marca.create({
      data:{
        treinador_uid:treinador.uid,
        marca_id:marcaId
      }
    })

    return {treinador}
  }
}