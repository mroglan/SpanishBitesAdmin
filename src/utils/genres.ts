import database from '../database/database'
import {DBGenre, Genre} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const addGenre = async (values:Genre) => {
    // const db = await database()

    // const dbOperation = await db.collection('genres').insertOne(values)

    // return <DBGenre>dbOperation.ops[0]

    const newGenre:any = await client.query(
        q.Create(q.Collection('genres'), {data: values})
    )

    return {...newGenre.data, _id: newGenre.ref.id}
}

export const modifyGenre = async (id: string, values:Genre) => {
    // const db = await database()

    // await db.collection('genres').updateOne({'_id': new ObjectId(id)}, {'$set': {...values}})

    await client.query(
        q.Update(q.Ref(q.Collection('genres'), id), {
            data: values
        })
    )
}

export const deleteGenre = async (id:string) => {
    // const db = await database()

    // await db.collection('genres').deleteOne({'_id': new ObjectId(id)})

    await client.query(
        q.Delete(q.Ref(q.Collection('genres'), id))
    )
}

export const getAllGenres = async () => {
    // const db = await database()

    // const genres:DBGenre[] = await db.collection('genres').find({}).sort({"name": 1}).toArray()

    const genres:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_genres')), {size: 1000}), (ref) => q.Get(ref))
    )

    return genres.data.map(d => ({...d.data, _id: d.ref.id})).sort((a, b) => a.name.localeCompare(b.name))
}