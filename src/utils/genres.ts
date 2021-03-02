import database from '../database/database'
import {DBGenre, Genre} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const addGenre = async (values:Genre) => {

    const newGenre:any = await client.query(
        q.Create(q.Collection('genres'), {data: values})
    )

    return {...newGenre.data, _id: newGenre.ref.id}
}

export const modifyGenre = async (id: string, values:Genre) => {

    await client.query(
        q.Update(q.Ref(q.Collection('genres'), id), {
            data: values
        })
    )
}

export const deleteGenre = async (id:string) => {

    await client.query(
        q.Delete(q.Ref(q.Collection('genres'), id))
    )
}

export const getAllGenres = async () => {

    const genres:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_genres')), {size: 1000}), (ref) => q.Get(ref))
    )

    return genres.data.map(d => ({...d.data, _id: d.ref.id})).sort((a, b) => a.name.localeCompare(b.name))
}