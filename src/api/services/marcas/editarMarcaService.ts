import { client } from "../../prisma/client";

interface IEditarMarca{
  marcaId:string,
  nome:string,
  donoId:string,
  cor:string,
  logotipo:string,
  mobilidade:boolean,
  isDeleted:boolean
}

export class EditarMarcaService {
  async execute({marcaId,nome,donoId,cor,logotipo,mobilidade} : IEditarMarca) {
      const editarMarca = await client.marcas.update({
          where : {
              marca_id:marcaId
          },
          data : {
              nome:nome,
              dono_id:donoId,
              cor:cor,
              logotipo:logotipo,
              mobilidade:true,
              isDeleted:false

          }
      })

  
      return {
          message:"Marca alterada com sucesso",
          
        };
      
  }
}