import {DBBook, ClientBook} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

interface Values extends Omit<ClientBook, '_id'> {}

const objectifyValues = (values:Values) => {
    return {
        ...values,
        authors: values.authors ? values.authors.map(author => q.Ref(q.Collection('authors'), author)) : [],
        genres: values.genres ? values.genres.map(genre => q.Ref(q.Collection('genres'), genre)) : [],
        timePeriod: values.timePeriod ? q.Ref(q.Collection('timePeriods'), values.timePeriod) : ''
    }
}

export const createBook = async (values:Values) => {

    const objectIdVals = objectifyValues(values)

    const newBook:any = await client.query(
        q.Create(q.Collection('books'), {data: objectIdVals})
    )

    return {...newBook.data, _id: newBook.ref.id,  timePeriod: newBook.data.timePeriod?.id || '',
    authors: newBook.data.authors.map(a => a.id), genres: newBook.data.genres.map(g => g.id)}
}

export const updateBook = async (id:string, values:Values) => {

    const objectIdVals = objectifyValues(values)

    await client.query(
        q.Update(q.Ref(q.Collection('books'), id), {
            data: objectIdVals
        })
    )
}

export const deleteBook = async (id:string) => {

    await client.query(
        q.Delete(q.Ref(q.Collection('books'), id))
    )
}

export const getAllBooks = async () => {

    const books:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_books')), {size: 1000}), (ref) => q.Get(ref))
    )

    return books.data.map(d => ({
        ...d.data, _id: d.ref.id, timePeriod: d.data.timePeriod?.id || '',
        authors: d.data.authors.map(a => a.id), genres: d.data.genres.map(g => g.id)
    })).sort((a, b) => a.title.localeCompare(b.title))
}   