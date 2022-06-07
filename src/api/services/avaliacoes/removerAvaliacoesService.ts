/**
 * @module RemoverAvaliacoesService
 */
import { checkAutorAvaliacao } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de remoção de uma avaliação
 */
export class RemoverAvaliacoesService {
    async execute(avaliacao_id: string, treinadorId: string) {

        const existstreinadorIdAvaliacao = await checkAutorAvaliacao(treinadorId);
        if (!existstreinadorIdAvaliacao) {
            return { data: "Treinador pertence há avaliação", status: 500 }
        }

        var atualizarAvaliacao = await client.avaliacoes.findUnique({
            where: { avaliacao_id: avaliacao_id }
        })

        if (atualizarAvaliacao == null) {
            return { data: "Não existe avaliação com o id fornecido", status: 500 };
        }

        const removerAvaliacao = await client.avaliacoes.update({
            where: { avaliacao_id: avaliacao_id },
            data: {
                isDeleted: true
            }
        })
        return { data: "A avaliação foi removida com sucesso", status: 200 };
    }
}