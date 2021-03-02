import database from '../database/database'
import {DBSpanishBite, ClientSpanishBite} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

interface Values extends Omit<ClientSpanishBite, '_id'> {}

export const createBite = async (values:Values) => {

    const newBite:any = await client.query(
        q.Create(q.Collection('bites'), {data: values})
    )

    return {...newBite.data, _id: newBite.ref.id}
}

export const modifyBite = async (id:string, values:Values) => {

    await client.query(
        q.Update(q.Ref(q.Collection('bites'), id), {data: values})
    )
}

export const deleteBite = async (id:string) => {

    await client.query(
        q.Delete(q.Ref(q.Collection('bites'), id))
    )
}

export const getAllBites = async () => {

    const bites:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_bites')), {size: 1000}), (ref) => q.Get(ref))
    )

    return bites.data.map(d => ({...d.data, _id: d.ref.id})).sort((a, b) => a.name.localeCompare(b.name))
}   