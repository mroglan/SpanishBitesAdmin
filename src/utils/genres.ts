import database from '../database/database'
import {DBGenre} from '../database/dbInterfaces'

export const getAllGenres = async () => {
    const db = await database()

    const genres:DBGenre[] = await db.collection('genres').find({}).toArray()

    return genres
}