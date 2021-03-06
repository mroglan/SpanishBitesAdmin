import {DBAuthor, Author, OrganizedDBAuthor, DBUnpopulatedAuthor, ClientUnpopulatedAuthor} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

interface Values extends Author {
    timePeriod: string;
}

const objectifyValues = (values:Values) => {
    if(!values.timePeriod) return values
    return {...values, timePeriod: q.Ref(q.Collection('timePeriods'), values.timePeriod)}
}

export const addAuthor = async (values:Values):Promise<ClientUnpopulatedAuthor> => {

    const objectVals = objectifyValues(values)

    const newAuthor:DBUnpopulatedAuthor = await client.query(
        q.Create(q.Collection('authors'), {data: objectVals})
    )

    return {...newAuthor.data, _id: newAuthor.ref.id, timePeriod: newAuthor.data.timePeriod?.id || ''}
}

export const modifyAuthor = async (id:string, values:Values) => {

    const objectVals = objectifyValues(values)

    await client.query(
        q.Update(q.Ref(q.Collection('authors'), id), {
            data: objectVals
        })
    )
}

export const deleteAuthor = async (id:string) => {

    await client.query(
        q.Delete(q.Ref(q.Collection('authors'), id))
    )
}

export const getAllAuthors = async ():Promise<ClientUnpopulatedAuthor[]> => {

    const authors:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_authors')), {size: 1000}), (ref) => q.Get(ref))
    )

    return authors.data.map(d => ({...d.data, _id: d.ref.id, timePeriod: d.data.timePeriod?.id || ''})).sort((a, b) => a.lastName.localeCompare(b.lastName))
}   