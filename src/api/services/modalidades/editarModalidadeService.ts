/**
 * @module EditarModalidadesService
 */

import { checkDonoGinasio, checkGinasioExists, checkModalidadeExists, checkModalidadeNome, getModalidadeGinasio } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
/**
 * @param modalidadeId modalidade id
 * @param imagemUrl imagem url
 * @param nome nome
 * @param ginasioId ginasio id
 * @param uid user id
 */
export interface IEditarModalidades {

  modalidadeId: string,
  imagemUrl: string,
  nome: string,
  ginasioId: string,
  uid: string,
}

/**
 * Classe responsavel pelo serviço de edição de modalidades
 */
export class EditarModalidadesService {
  /**
   * Método que permite editar uma modalidade tendo em conta todas as verificações necessárias
   * @param IEditarModalidades dados da modalidade 
   * @returns 
   */
  async execute({ imagemUrl, nome, modalidadeId, ginasioId, uid }: IEditarModalidades) {
    const exists_dst = await checkModalidadeExists(modalidadeId);
    if (!exists_dst) {
      return { data: "A modalidade não existe", status: 500 }
    }

    const existsGinasio = await checkGinasioExists(ginasioId);
    if (!existsGinasio) {
      return { data: "Ginasio não existe", status: 500 }
    }

    const isAutor = await checkDonoGinasio(ginasioId, uid);
    if (!isAutor) {
      return { data: "Não possui autorização", status: 500 }
    }

    const exist_nome = await checkModalidadeNome(nome, ginasioId);
    if (exist_nome) {
      return { data: "A modalidade já existe", status: 500 }
    }

    let ginasio = await getModalidadeGinasio(modalidadeId);
    if (ginasio == ginasioId) {
      const editarModalidades = await client.modalidades_ginasio.update({
        where: {
          modalidade_id: modalidadeId
        },
        data: {
          modalidade_id: modalidadeId,
          imagem_url: imagemUrl,
          nome: nome
        }
      })

      return { data: editarModalidades, status: 200 };
    }
    else {
      return { data: "A modalidade não pertence ao ginásio", status: 500 }
    }
  }
}