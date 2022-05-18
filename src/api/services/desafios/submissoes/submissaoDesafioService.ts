import { checkDesafioIdExists, checkGinasioExists, checkMobilidadeMarcaUser, checkUserIdExists, getDesafio, getMarcaGym, getTreinadorMarca } from "../../../helpers/dbHelpers";
import { client } from "../../../prisma/client";

interface ISubmissaoDesafio {
  desafioId: string;
  uid: string;
  valor: string;
  treinadorId: string;
  ginasioId: string;
}

export class SubmissaoDesafioService {
  async execute({ desafioId, uid, valor, treinadorId, ginasioId }: ISubmissaoDesafio) {
    const existsDesafio = await checkDesafioIdExists(desafioId);
    if (!existsDesafio) {
      return { date: "Desafio Inexistente", status: 500 }
    }

    const existsAluno = await checkUserIdExists(uid);
    if (!existsAluno) {
      return { date: "Aluno inexistente", status: 500 }
    }

    const existsTreinador = await checkUserIdExists(treinadorId);
    if (!existsTreinador) {
      return { date: "Treinador inexistente", status: 500 }
    }

    const existsGinasio = await checkGinasioExists(ginasioId);
    if (!existsGinasio) {
      return { date: "Ginasio inexistente", status: 500 }
    }

    const desafio = await getDesafio(desafioId);
    const gymDesafio = desafio.ginasio_id;
    const marca = await getMarcaGym(gymDesafio);

    const marca_treinador = await getTreinadorMarca(treinadorId)
    if (marca_treinador != marca.marca_id) {
      return { date: "Não tem autorização", status: 500 }
    }

    // para o aluno
    const { mobilidade, id } = await checkMobilidadeMarcaUser(uid);
    if (mobilidade) {
      if (id['marca_id'] != marca.marca_id) {
        return { date: "Não possui permissão", status: 500 }
      }
    }
    else {
      if (id['ginasio_id'] != desafio.ginasio_id) {
        return { date: "Não possui permissão", status: 500 }
      }
    }

    if (!marca.mobilidade && gymDesafio != ginasioId) {
      return { date: "Entrada invalida", status: 500 }
    }

    const submissao = await client.submissoes_desafios.create({
      data: {
        uid,
        valor,
        desafio_id: desafioId,
        treinador_id: treinadorId,
        ginasio_id: ginasioId
      }
    })

    return submissao;
  }
}