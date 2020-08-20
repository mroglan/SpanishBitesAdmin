import database from '../database/database'
import {DBAuthor} from '../database/dbInterfaces'

export const getAllAuthors = async () => {
    const db = await database()

    const authors:DBAuthor[] = await db.collection('authors').find({}).sort({'firstName': 1}).toArray()

    return authors
}   