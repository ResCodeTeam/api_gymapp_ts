import { checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";


interface IEditarPerfil{
    uId:string,
    email: string,
    nome:  string,
    password: string,
    dataNasc: Date,  
    dataEntrada: Date, 
    funcaoId: String,
    genero: number,
    pontos: number,
    descricao: String,
    estado:number,
    imagemUrl: string  
}


export class EditarPerfilService {
  async execute({  
    uId,
    email,
    nome,
    password,
    dataNasc,
    dataEntrada,
    funcaoId,
    genero,
    pontos,
    descricao,
    estado,
    imagemUrl 

  } : IEditarPerfil){
    const editarModalidades = await client.users.updateMany({
        where : {
          uid:uId
              
        },
        data : {
          email:email,
          nome:nome,
          password:password,
          data_nasc:dataNasc,
          data_entrada:dataEntrada,
          genero:genero,
          pontos:pontos,
          descricao:descricao,
          estado:estado,
          imagem_url:imagemUrl
        }
    })
  }

  


