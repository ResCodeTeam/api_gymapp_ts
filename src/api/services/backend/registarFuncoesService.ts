/**
 * @module RegistarFuncoesService
 */
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço de criação de funções dos utilizadores
 */
export class RegistarFuncoesService {
    /**
 * Método que permite inserir funcoes na base de dados tendo em conta todas as verificações necessárias
 * 
 * @param nome nome da função
 */
    async execute(nome: string) {
        const funcao = await client.funcoes.create({
            data: {
                descricao: nome
            }
        })
        return {data: funcao, status: 200};
    }
}