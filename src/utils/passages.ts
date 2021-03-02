import database from '../database/database'
import {DBPassage, ClientPassage} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

interface Values extends Omit<ClientPassage, '_id'> {}

const objectifyValues = (values:Values) => {

    // return {...values, book:values.book ? new ObjectId(values.book) : undefined,
    //     authors: values.authors ? values.authors.map(author => new ObjectId(author)) : undefined
    // }
    return {...values, book: values.book ? q.Ref(q.Collection('books'), values.book) : '',
        authors: values.authors.map(a => q.Ref(q.Collection('authors'), a))
    }
}

export const createPassage = async (values:Values) => {
    // const db = await database()

    // const dbOperation = await db.collection('passages').insertOne(objectifyValues(values))

    // return <DBPassage>dbOperation.ops[0]

    const newPassage:any = await client.query(
        q.Create(q.Collection('passages'), {data: objectifyValues(values)})
    )

    return {
        ...newPassage.data, _id: newPassage.ref.id,
        authors: newPassage.data.authors.map(a => a.id),
        book: newPassage.data.book?.id || ''
    }
}

export const modifyPassage = async (id:string, values:Values) => {
    // const db = await database()

    // await db.collection('passages').updateOne({'_id': new ObjectId(id)}, {'$set': {...objectifyValues(values)}})

    await client.query(
        q.Update(q.Ref(q.Collection('passages'), id), {
            data: objectifyValues(values)
        })
    )
}

export const deletePassage = async (id:string) => {
    // const db = await database()

    // await db.collection('passages').deleteOne({'_id': new ObjectId(id)})

    await client.query(
        q.Delete(q.Ref(q.Collection('passages'), id))
    )
}

export const getAllPassages = async () => {
    // const db = await database()

    // const passages:DBPassage[] = await db.collection('passages').find({}).sort({"name": 1}).toArray()

    const passages:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_passages')), {size: 1000}), (ref) => q.Get(ref))
    )

    return passages.data.map(p => ({
        ...p.data, _id: p.ref.id,
        authors: p.data.authors.map(a => a.id),
        book: p.data.book?.id || ''
    }))
}