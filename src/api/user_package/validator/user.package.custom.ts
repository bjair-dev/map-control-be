import { DataBase } from "../../../database"

export const existsUserPackage = async (id:number|string,  { req }: { req: any }) => {
    
    const type = req.query.type
    if(type && type == 'temporary'){
        const findUserPackageTemporaryById = await DataBase.instance.temporaryUserPackage.findByPk(Number(id))
        if(!findUserPackageTemporaryById)throw new Error(`No existe el id ${id} en el banco de datos temporal`)
        
    }
    else{
        const findUserPackageById = await DataBase.instance.userPackage.findByPk(Number(id))
        if(!findUserPackageById)throw new Error(`No existe el id ${id}`)
    }
    
    
}