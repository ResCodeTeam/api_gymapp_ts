/**
 * @module VerTodosMusculosService
 */
import { client } from "../../prisma/client";

/**
 * Classe responsavel pelo serviço que serve para obter todos os músculos
 */
export class VerTodosMusculosService {
    /**
     * Método que permite obter todos os músculos
     */
    async execute() {

        const musculos = await client.musculos.findMany({
            select: {
                nome: true,
                img_url: true,
            }
        })
        return { data: musculos, status: 200 };
    }
}