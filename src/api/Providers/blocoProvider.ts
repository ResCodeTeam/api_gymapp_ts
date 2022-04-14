import { ExercicioP } from "./exercicioPlanoProvider";

export class Bloco{
    blocoId: string;
    nome:string;
    descricao: string;
    nOrdem: number;
    exercicios: Array<ExercicioP>;
}