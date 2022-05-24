import { getTreinadorMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class VerDesafiosMarcaService {
  async execute(uid: string) {
    const marcaId = await getTreinadorMarca(uid);
    const desafios = await client.desafios.findMany({
      where: {
        ginasio: {
          marca_id: marcaId
        }
      }
    })
    return { data: desafios, status: 200 };
  }
}