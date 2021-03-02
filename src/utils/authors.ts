import database from '../database/database'
import {DBAuthor, Author} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'
import { object } from 'yup'

interface Values extends Author {
    timePeriod: string;
}

const objectifyValues = (values:Values) => {
    if(!values.timePeriod) return values
    return {...values, timePeriod: q.Ref(q.Collection('timePeriods'), values.timePeriod)}
    // return {...values, timePeriod: new ObjectId(values.timePeriod)}
}

export const addAuthor = async (values:Values) => {
    // const db = await database()

    const objectVals = objectifyValues(values)

    const newAuthor:any = await client.query(
        q.Create(q.Collection('authors'), {data: objectVals})
    )

    return {...newAuthor.data, _id: newAuthor.ref.id, timePeriod: newAuthor.data.timePeriod?.id || ''}

    // const dbOperation = await db.collection('authors').insertOne(objectVals)

    // return <DBAuthor>dbOperation.ops[0]
}

export const modifyAuthor = async (id:string, values:Values) => {
    // const db = await database()

    const objectVals = objectifyValues(values)

    // await db.collection('authors').updateOne({'_id': new ObjectId(id)}, {'$set': {...objectVals}})

    await client.query(
        q.Update(q.Ref(q.Collection('authors'), id), {
            data: objectVals
        })
    )
}

export const deleteAuthor = async (id:string) => {
    // const db = await database()

    // await db.collection('authors').deleteOne({'_id': new ObjectId(id)})

    await client.query(
        q.Delete(q.Ref(q.Collection('authors'), id))
    )
}

export const getAllAuthors = async () => {
    // const db = await database()

    // const authors:DBAuthor[] = await db.collection('authors').find({}).sort({'lastName': 1}).toArray()

    const authors:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_authors')), {size: 1000}), (ref) => q.Get(ref))
    )

    return authors.data.map(d => ({...d.data, _id: d.ref.id, timePeriod: d.data.timePeriod?.id || ''})).sort((a, b) => a.lastName.localeCompare(b.lastName))
}   