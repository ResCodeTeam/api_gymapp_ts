import { ExercicioP } from "./exercicioPlanoProvider";

export class Bloco{
    blocoId: string;
    planoTreinoId: string;
    nome:string;
    descricao: string;
    exercicios: Array<ExercicioP>;
}