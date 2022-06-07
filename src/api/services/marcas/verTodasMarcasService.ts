/**
 * @module VerTodasMarcasService
 */
import { client } from "../../prisma/client";

/**
 * @param donoId
 * @param filtroId
 */
export interface IGinasios {
    donoId: string,
    filtroId: string
}

/**
 * Classe responsavel pelo serviço que serve para obter todas as marcas
 * Podendo ser aplicado um filtro à pesquisa
 */
export class VerTodasMarcasService {
    async execute({ donoId, filtroId }: IGinasios) {
        let filtro = filtroId
        let marcas : any

        console.log(filtroId)
        
        if (filtro == '1') { // nome ascendente
            marcas = await client.marcas.findMany({
                where: {
                    dono_id: donoId,
                    isDeleted: false
    
                }, 
                orderBy: {
                    nome: 'asc'
                },
                select:{
                    marca_id: true,
                    nome:true,
                    cor:true,
                    logotipo:true,
                    mobilidade: true
                }        
             })
        } else if (filtro == '2') { // nome descendente
            marcas = await client.marcas.findMany({
                where: {
                    dono_id: donoId,
                    isDeleted: false
    
                }, 
                orderBy: {
                    nome: 'desc'
                },
                select:{
                    marca_id: true,
                    nome:true,
                    cor:true,
                    logotipo:true,
                    mobilidade: true
                }        
             })
        } else if (filtro == '3') { // c/ mobilidade
            marcas = await client.marcas.findMany({
                where: {
                    dono_id: donoId,
                    isDeleted: false,
                    mobilidade: true
                },
                select:{
                    marca_id: true,
                    nome:true,
                    cor:true,
                    logotipo:true,
                    mobilidade: true
                }        
             })
        } else if (filtro == '4') { // s/ mobilidade
            marcas = await client.marcas.findMany({
                where: {
                    dono_id: donoId,
                    isDeleted: false,
                    mobilidade: false
                },
                select:{
                    marca_id: true,
                    nome:true,
                    cor:true,
                    logotipo:true,
                    mobilidade: true
                }        
             })
        } else { /* todos */
            marcas = await client.marcas.findMany({
                where: {
                    dono_id: donoId,
                    isDeleted: false
    
                }, select:{
                    marca_id: true,
                    nome:true,
                    cor:true,
                    logotipo:true,
                    mobilidade: true
                }        
             })
        }

        return {data: marcas, status: 200};
    }
}