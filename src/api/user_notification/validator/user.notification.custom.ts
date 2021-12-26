import { DataBase } from "../../../database"

export const notExistsUserNotification = async(id:number) => {
    
    const exists = await DataBase.instance.userNotification.findOne({
        where:{ id }
    })
    if(!exists) throw new Error(`No existe el id : ${id}`)
    
}