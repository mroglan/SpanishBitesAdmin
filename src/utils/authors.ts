import database from '../database/database'
import {DBAuthor, Author} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

interface Values extends Author {
    timePeriod: string;
}

const objectifyValues = (values:Values) => {
    if(!values.timePeriod) return values
    return {...values, timePeriod: new ObjectId(values.timePeriod)}
}

export const addAuthor = async (values:Values) => {
    const db = await database()

    const objectVals = objectifyValues(values)

    const dbOperation = await db.collection('authors').insertOne(objectVals)

    return <DBAuthor>dbOperation.ops[0]
}

export const modifyAuthor = async (id:string, values:Values) => {
    const db = await database()

    const objectVals = objectifyValues(values)

    await db.collection('authors').updateOne({'_id': new ObjectId(id)}, {'$set': {...objectVals}})
}

export const deleteAuthor = async (id:string) => {
    const db = await database()

    await db.collection('authors').deleteOne({'_id': new ObjectId(id)})
}

export const getAllAuthors = async () => {
    const db = await database()

    const authors:DBAuthor[] = await db.collection('authors').find({}).sort({'lastName': 1}).toArray()

    return authors
}   