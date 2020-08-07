import database from '../database/database'
import {DBAuthor} from '../database/dbInterfaces'

export const getAllAuthors = async () => {
    const db = await database()

    const authors:DBAuthor[] = await db.collection('authors').find({}).toArray()
    // aggregate([
    //     {
    //         '$lookup': {
    //             'from': 'timePeriods',
    //             'localField': 'timePeriod',
    //             'foreignField': '_id',
    //             'as': 'timePeriod'
    //         }
    //     }
    // ]).toArray()

    return authors
}   