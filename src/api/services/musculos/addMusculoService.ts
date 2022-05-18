import { checkMusculoNomeExists } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class AddMusculoService {
  async execute(nome: string, image: string) {
    const existsMusculeName = await checkMusculoNomeExists(nome);
    if (existsMusculeName) {
      return { date: "Musculo já existente", status: 500 }
    }

    const musculo = await client.musculos.create({
      data: {
        nome,
        img_url: image
      }
    })

    return musculo;
  }
}