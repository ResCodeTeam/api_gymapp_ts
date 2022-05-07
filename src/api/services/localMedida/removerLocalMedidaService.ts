import { checkAutorMarca, checkMarcaExists, getLocalMedidaMarca } from "../../helpers/dbHelpers";
import { client } from "../../prisma/client";

export class RemoverLocalMedidaService{
  async execute(uid:string,marcaId:string,localId:string){
    
    const isMarca = await checkMarcaExists(marcaId);
    if(!isMarca){
      throw new Error("A marca não existe")
    }
    
    const isAutorMarca = await checkAutorMarca(uid,marcaId);
    if(!isAutorMarca){
      throw new Error("Não possui autorização para realizar esta operação")
    }

    let marca = await getLocalMedidaMarca(localId);
    if(marca == marcaId){
        await client.local_medidas_marca.delete({
          where:{
              local_medida_id_marca_id: {
                  marca_id: marcaId,
                  local_medida_id: localId
              }
          },
        })

      const localMedida = await client.locais_medidas.delete({
          where:{
              local_medida_id: localId
          }
      })
    }
    else{
      throw new Error("O local de medida não pertence à marca")
    }
    
    return {"msg":"Local removido com sucesso"}

  }
}