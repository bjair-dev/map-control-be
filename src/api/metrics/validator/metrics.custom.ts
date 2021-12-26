import { DataBase } from "../../../database"

export const notExistsMetric =  async(id:number) => {
    
    const metric = await DataBase.instance.metrics.findOne({where:{id}})
    if(!metric) throw new Error(`No existe el id ${id}`)
    
}