import database from '../database/database'
import {DBPassage} from '../database/dbInterfaces'

export const getAllPassages = async () => {
    const db = await database()

    const passages:DBPassage[] = await db.collection('passages').find({}).sort({"name": 1}).toArray()

    return passages
}