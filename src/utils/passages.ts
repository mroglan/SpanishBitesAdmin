import database from '../database/database'
import {DBPassage, ClientPassage} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

interface Values extends Omit<ClientPassage, '_id'> {}

const objectifyValues = (values:Values) => {
    if(!values.book) return values

    return {...values, book: new ObjectId(values.book)}
}

export const createPassage = async (values:Values) => {
    const db = await database()

    const dbOperation = await db.collection('passages').insertOne(objectifyValues(values))

    return <DBPassage>dbOperation.ops[0]
}

export const modifyPassage = async (id:string, values:Values) => {
    const db = await database()

    await db.collection('passages').updateOne({'_id': new ObjectId(id)}, {'$set': {...objectifyValues(values)}})
}

export const deletePassage = async (id:string) => {
    const db = await database()

    await db.collection('passages').deleteOne({'_id': new ObjectId(id)})
}

export const getAllPassages = async () => {
    const db = await database()

    const passages:DBPassage[] = await db.collection('passages').find({}).sort({"name": 1}).toArray()

    return passages
}