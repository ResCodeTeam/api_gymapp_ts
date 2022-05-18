import { checkSubmissaoExists, checkAutorSubmissaoDesafio, checkDesafioIdExists, checkIsSubmissaoDesafio, getDesafio, getMarcaGym, getTreinadorMarca } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

export class RemoverSubmissaoDesafioService {
  async execute(uid: string, submissaoId: string, desafioId: string) {

    const existsDesafio = await checkDesafioIdExists(desafioId);
    if (!existsDesafio) {
      return { date: "Desafio inexistente", status: 500 }
    }

    const isSubmissaoDesafio = await checkIsSubmissaoDesafio(desafioId, submissaoId);
    if (!isSubmissaoDesafio) {
      return { date: "Não é submissao do desafio", status: 500 }
    }

    const exists_submissao = await checkSubmissaoExists(submissaoId);
    if (!exists_submissao) {
      return { date: "A submissao do desafio não existe", status: 500 }
    }

    const desafio = await getDesafio(desafioId);
    const gymDesafio = desafio.ginasio_id;
    const marca = await getMarcaGym(gymDesafio);

    const marca_treinador = await getTreinadorMarca(uid)
    if (marca_treinador != marca.marca_id) {
      return { date: "Não tem autorização", status: 500 }
    }

    const submissoes = await client.submissoes_desafios.delete({
      where: {
        submissao_id: submissaoId
      },
    })

    return { "msg": "submissao removida com sucesso" }

  }
}