import database from '../database/database'
import {DBSpanishBite, ClientSpanishBite} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

interface Values extends Omit<ClientSpanishBite, '_id'> {}

export const createBite = async (values:Values) => {
    const db = await database()

    const dbOperation = await db.collection('bites').insertOne(values)

    return <DBSpanishBite>dbOperation.ops[0]
}

export const modifyBite = async (id:string, values:Values) => {
    const db = await database()

    await db.collection('bites').updateOne({'_id': new ObjectId(id)}, {'$set': {...values}})
}

export const deleteBite = async (id:string) => {
    const db = await database()

    await db.collection('bites').deleteOne({'_id': new ObjectId(id)})
}

export const getAllBites = async () => {
    const db = await database()

    const bites:DBSpanishBite[] = await db.collection('bites').find({}).sort({"name": 1}).toArray()

    return bites
}   