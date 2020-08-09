import database from '../database/database'
import {DBPassage} from '../database/dbInterfaces'

export const getAllPassages = async () => {
    const db = await database()

    const passages:DBPassage[] = await db.collection('passages').find({}).toArray()

    return passages
}