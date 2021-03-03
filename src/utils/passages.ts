import {DBPassage, ClientPassage} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

interface Values extends Omit<ClientPassage, '_id'> {}

const objectifyValues = (values:Values) => {

    return {...values, book: values.book ? q.Ref(q.Collection('books'), values.book) : '',
        authors: values.authors.map(a => q.Ref(q.Collection('authors'), a))
    }
}

export const createPassage = async (values:Values) => {

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

    await client.query(
        q.Update(q.Ref(q.Collection('passages'), id), {
            data: objectifyValues(values)
        })
    )
}

export const deletePassage = async (id:string) => {

    await client.query(
        q.Delete(q.Ref(q.Collection('passages'), id))
    )
}

export const getAllPassages = async () => {

    const passages:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_passages')), {size: 1000}), (ref) => q.Get(ref))
    )

    return passages.data.map(p => ({
        ...p.data, _id: p.ref.id,
        authors: p.data.authors.map(a => a.id),
        book: p.data.book?.id || ''
    }))
}