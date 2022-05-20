import { hash } from "bcrypt";
import { checkChangeEmail, checkUserIdExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";


interface IEditarPerfil {
  uId: string,
  email: string,
  nome: string,
  password: string,
  genero: number,
  descricao: string,
  imagemUrl: string
}


export class EditarPerfilService {
  async execute({
    uId,
    email,
    nome,
    password,
    genero,
    descricao,
    imagemUrl

  }: IEditarPerfil) {
    const existsUser = await checkUserIdExists(uId);
    if (!existsUser) {
      return { data: "Utilizador inexistente", status: 500 }
    }

    // verificar se o aluno já está registado
    let existsEmail = await checkChangeEmail(email, uId);
    if (existsEmail) {
      return { data: "Email já registado!", status: 500 }
    }
    let passwd = await hash(password, 8);

    const user = await client.users.update({
      where: {
        uid: uId
      },
      data: {
        email: email,
        nome: nome,
        password: passwd,
        genero: genero,
        descricao: descricao,
        imagem_url: imagemUrl
      }
    })
    return { data: user, status: 200 };
  }
}



