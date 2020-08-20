import database from '../database/database'
import {DBBook} from '../database/dbInterfaces'

export const getAllBooks = async () => {
    const db = await database()

    const books:DBBook[] = await db.collection('books').find({}).sort({"title": 1}).toArray()

    return books
}   