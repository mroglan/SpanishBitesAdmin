import database from '../database/database'
import {DBGenre, Genre} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

export const addGenre = async (values:Genre) => {
    const db = await database()

    const dbOperation = await db.collection('genres').insertOne(values)

    return <DBGenre>dbOperation.ops[0]
}

export const modifyGenre = async (id: string, values:Genre) => {
    const db = await database()

    await db.collection('genres').updateOne({'_id': new ObjectId(id)}, {'$set': {...values}})
}

export const deleteGenre = async (id:string) => {
    const db = await database()

    await db.collection('genres').deleteOne({'_id': new ObjectId(id)})
}

export const getAllGenres = async () => {
    const db = await database()

    const genres:DBGenre[] = await db.collection('genres').find({}).sort({"name": 1}).toArray()

    return genres
}