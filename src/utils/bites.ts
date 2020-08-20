import database from '../database/database'
import {DBSpanishBite} from '../database/dbInterfaces'

export const getAllBites = async () => {
    const db = await database()

    const bites:DBSpanishBite[] = await db.collection('bites').find({}).sort({"name": 1}).toArray()

    return bites
}   