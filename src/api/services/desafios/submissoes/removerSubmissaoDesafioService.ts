/**
 * @module RemoverSubmissaoDesafioService
 */
import { checkSubmissaoExists, checkDesafioIdExists, checkIsSubmissaoDesafio, getDesafio, getMarcaGym, getTreinadorMarca } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

/**
 * Classe responsavel pelo serviço de remoção de submissões dos resultados dos desafios
 */
export class RemoverSubmissaoDesafioService {
  /**
 * Método que permite remover uma submissão de um desafio na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param uid id do utilizador
 * @param submissaoId id da submissão
 * @param desafioId id do desafio cujo resultado vai ser submetido
 */
  async execute(uid: string, submissaoId: string, desafioId: string) {

    const existsDesafio = await checkDesafioIdExists(desafioId);
    if (!existsDesafio) {
      return { data: "Desafio inexistente", status: 500 }
    }

    const isSubmissaoDesafio = await checkIsSubmissaoDesafio(desafioId, submissaoId);
    if (!isSubmissaoDesafio) {
      return { data: "Não é submissao do desafio", status: 500 }
    }

    const exists_submissao = await checkSubmissaoExists(submissaoId);
    if (!exists_submissao) {
      return { data: "A submissao do desafio não existe", status: 500 }
    }

    const desafio = await getDesafio(desafioId);
    const gymDesafio = desafio.ginasio_id;
    const marca = await getMarcaGym(gymDesafio);

    const marca_treinador = await getTreinadorMarca(uid)
    if (marca_treinador != marca.marca_id) {
      return { data: "Não tem autorização", status: 500 }
    }

    const submissoes = await client.submissoes_desafios.delete({
      where: {
        submissao_id: submissaoId
      },
    })

    return { data: "submissao removida com sucesso", status: 200 }

  }
}