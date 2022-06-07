/**
 * @module EditarMarcaService
 */

import { checkAutorMarca, checkMarcaExists, checkNomeMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * @param marcaId id da marca
 * @param nome nome da marca
 * @param mobilidade mobilidade da marca
 * @param cor cor da marca
 * @param logotipo url do logotipo da marca
 * @param adminId id do admin
 * @param mobilidade mobilidade da marca
 */
export interface IEditarMarca {
  marcaId: string,
  nome: string,
  cor: string,
  logotipo: string,
  adminId: string,
  mobilidade: boolean,

}

/**
 * Classe responsavel pelo serviço de edição de marcas
 */
export class EditarMarcaService {
  async execute({ marcaId, adminId, nome, cor, logotipo, mobilidade }: IEditarMarca) {

    const existsMarca = await checkMarcaExists(marcaId)
    if (!existsMarca) {
      return { data: "Marca não existe", status: 500 }
    }

    const isAutor = await checkAutorMarca(adminId, marcaId)
    if (!isAutor) {
      return { data: "Não possui autorização para fazer esta alteração", status: 500 }
    }

    const exist_nome = await checkNomeMarca(nome);
    if (exist_nome) {
      return { data: "A marca já existe", status: 500 }
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

    return { data: editarMarca, status: 200 };
  }
}