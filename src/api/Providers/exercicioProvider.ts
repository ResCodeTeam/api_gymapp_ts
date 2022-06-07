import { Serie } from "./serieProvider"

/**
 * Classe que representa um exercício
 * @param exercicioId id do exercicio
 * @param nOrdem numero de ordem do exercicio
 * @param genero genero do exercicio
 * @param series series do exercicio
 */
export class Exercicio {
    exercicioId: string
    nOrdem: number
    genero: number
    series: Array<Serie>
}