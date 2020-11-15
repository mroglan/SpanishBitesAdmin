import database from '../database/database'
import {DBBook, ClientBook} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

interface Values extends Omit<ClientBook, '_id'> {}

const objectifyValues = (values:Values) => {
    if(!values.authors || !values.genres || !values.timePeriod) return values
    return {
        ...values,
        authors: values.authors.map(author => new ObjectId(author)),
        genres: values.genres.map(genre => new ObjectId(genre)),
        timePeriod: new ObjectId(values.timePeriod)
    }
}

export const createBook = async (values:Values) => {
    const db = await database()

    const objectIdVals = objectifyValues(values)

    const dbOperation = await db.collection('books').insertOne(objectIdVals)

    return <DBBook>dbOperation.ops[0]
}

export const updateBook = async (id:string, values:Values) => {
    const db = await database()

    const objectIdVals = objectifyValues(values)

    await db.collection('books').updateOne({'_id': new ObjectId(id)}, {'$set': {...objectIdVals}})
}

export const deleteBook = async (id:string) => {
    const db = await database()

    await db.collection('books').deleteOne({'_id': new ObjectId(id)})
}

export const getAllBooks = async () => {
    const db = await database()

    const books:DBBook[] = await db.collection('books').find({}).sort({"title": 1}).toArray()

    return books
}   