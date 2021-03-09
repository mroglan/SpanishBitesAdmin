import {DBClubEvent} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

interface CreateEventValues {
    year: string;
    month: string;
}

export const getAllEvents = async () => {

    const events:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_clubEvents'))), (ref) => q.Get(ref))
    )

    return <DBClubEvent[]>events.data.map(d => ({...d.data, _id: d.ref.id}))
}

export const verifyUniqueTime = async ({year, month}:CreateEventValues) => {

    const unique = await client.query(
        q.Let(
            {
                yearRefs: q.Paginate(q.Match(q.Index('clubEvents_by_year'), year)),
                monthRefs: q.Paginate(q.Match(q.Index('clubEvents_by_month'), month))
            },
            q.If(
                q.Equals(q.Count(q.Select(['data'], q.Var('yearRefs'))), 0),
                true,
                q.If(
                    q.Equals(q.Count(q.Select(['data'], q.Var('monthRefs'))), 0),
                    true,
                    q.Equals(
                        q.Count(
                            q.Intersection(
                                q.Select(['data'], q.Var('yearRefs')), q.Select(['data'], q.Var('monthRefs'))
                            )
                        ), 0
                    )
                )
            )
        )
    )

    return unique
}

export const createEvent = async (values:CreateEventValues) => {

    const data = {...values, bookName: '', bookAuthor: '', bookDesc: '', bookImage: ''}

    const newEvent:any = await client.query(
        q.Create(q.Collection('clubEvents'), {data})
    )
    
    return {...newEvent.data, _id: newEvent.ref.id}
}