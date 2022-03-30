import { checkUserIdExists } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";


interface IEditarPerfil{

    email: string
    nome:  string
    password: string
    data_nasc: Date 
    hashtag: String  
    data_entrada: Date 
    funcao_id: String
    refresh_token: String
    genero: number
    pontos: number
    descricao: String
    imagem_url: string  
}

class EditarPerfilService {
    async execute(userId: string) {
      const exists_dst = await checkUserIdExists(userId);
      if (!exists_dst) {
        throw new Error("A modalidade não existe");
      }
    }
}



