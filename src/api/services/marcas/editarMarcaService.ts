import { checkAutorMarca, checkMarcaExists, checkNomeMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

interface IEditarMarca {
  marcaId: string,
  nome: string,
  cor: string,
  logotipo: string,
  adminId: string,
  mobilidade: boolean,

}

export class EditarMarcaService {
  async execute({ marcaId, adminId, nome, cor, logotipo, mobilidade }: IEditarMarca) {

    const existsMarca = await checkMarcaExists(marcaId)
    if (!existsMarca) {
      return { date: "Marca não existe", status: 500 }
    }
    console.log(marcaId, adminId)
    const isAutor = await checkAutorMarca(adminId, marcaId)
    if (!isAutor) {
      return { date: "Não possui autorização para fazer esta alteração", status: 500 }
    }

    const exist_nome = await checkNomeMarca(nome);
    if (exist_nome) {
      return { date: "A marca já existe", status: 500 }
    }

    const editarMarca = await client.marcas.update({
      where: {
        marca_id: marcaId

      },
      data: {
        nome: nome,
        cor: cor,
        logotipo: logotipo,
        mobilidade: mobilidade

      }
    })


    return editarMarca



  }
}