/**
 * @module RegistarMarcaGinasiosService
 */

import { client } from "../../prisma/client";
import { checkDonoMarca, checkMarcaExists } from "../../helpers/dbHelpers";
import { getGymTag } from "../../helpers/tagHelpers";

/**
 * @param nome nome do ginasio
 * @param rua morada do ginasio
 * @param cp número de código postal do ginasio
 * @param cpExt extensão do código postal do ginasio
 * @param marcaId marca id
 * @param imagemUrl url da imagem do ginasio
 * @param lat latitude do ginasio
 * @param long longitude do ginasio
 * @param uId id do utilizador
 */
export interface IRegistarMarcaGinasiosService {
  nome: string;
  rua: string;
  cp: number;
  cpExt: number;
  marcaId: string;
  imagemUrl: string;
  lat: string;
  long: string;
  uId: string;
}

export class RegistarMarcaGinasiosService {
  async execute({
    nome,
    rua,
    cp,
    cpExt,
    marcaId,
    imagemUrl,
    lat,
    long,
    uId
  }: IRegistarMarcaGinasiosService) {
    // Obter a tag do ginásio automaticamente
    let tag = await getGymTag(nome);

    const exists_marca = await checkMarcaExists(marcaId);
    if (!exists_marca) {
      return { data: "A marca não existe", status: 500 }
    }

    await checkDonoMarca(marcaId, uId)

    const localidade = await client.localidades.findFirst({
      where: {
        cp,
        cp_ext: cpExt
      }
    })

    const ginasio = await client.ginasio.create({
      data: {
        nome,
        rua,
        tag,
        imagem_url: "teste",
        lat,
        long,
        localidades: {
          connect: {
            cp_id: localidade.cp_id

          }
        },
        marcas: {
          connect: {
            marca_id: marcaId
          }
        }
      },
    });
    return { data: ginasio, status: 200 };
  }
}

