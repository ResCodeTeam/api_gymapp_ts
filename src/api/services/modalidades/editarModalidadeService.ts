import { checkDonoGinasio, checkGinasioExists, checkModalidadeExists, checkModalidadeNome, getModalidadeGinasio } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";
interface IEditarModalidades {

  modalidadeId: string,
  imagemUrl: string,
  nome: string,
  ginasioId: string,
  uid: string,
}

export class EditarModalidadesService {
  async execute({ imagemUrl, nome, modalidadeId, ginasioId, uid }: IEditarModalidades) {
    const exists_dst = await checkModalidadeExists(modalidadeId);
    if (!exists_dst) {
      return { date: "A modalidade não existe", status: 500 }
    }

    const existsGinasio = await checkGinasioExists(ginasioId);
    if (!existsGinasio) {
      return { date: "Ginasio não existe", status: 500 }
    }

    const isAutor = await checkDonoGinasio(ginasioId, uid);
    if (!isAutor) {
      return { date: "Não possui autorização", status: 500 }
    }

    const exist_nome = await checkModalidadeNome(nome, ginasioId);
    if (exist_nome) {
      return { date: "A modalidade já existe", status: 500 }
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

      return editarModalidades;
    }
    else {
      return { date: "A modalidade não pertence ao ginásio", status: 500 }
    }
  }
}