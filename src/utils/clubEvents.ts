import {OrganizedDBClubEvent, ClientClubEvent, DBClubEvent} from '../database/dbInterfaces'
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

    return <OrganizedDBClubEvent[]>events.data.map(d => ({...d.data, _id: d.ref.id})).sort((a, b) => (
        new Date(b.month + ' ' + b.year).getTime() - new Date(a.month + ' ' + a.year).getTime()
    ))
}

export const getEvent = async ({month, year}:CreateEventValues):Promise<OrganizedDBClubEvent> => {

    const event:DBClubEvent[] = await client.query(
        q.Let(
            {
                yearRefs: q.Select(['data'], q.Paginate(q.Match(q.Index('clubEvents_by_year'), year))),
                monthRefs: q.Select(['data'], q.Paginate(q.Match(q.Index('clubEvents_by_month'), month)))
            },
            q.If(
                q.Equals(q.Count(q.Var('yearRefs')), 0),
                null,
                q.If(
                    q.Equals(q.Count(q.Var('monthRefs')), 0),
                    null,
                    q.Map(
                        q.Intersection(
                            q.Var('yearRefs'), q.Var('monthRefs')
                        ),
                        (ref) => q.Get(ref)
                    )
                )
            )
        )
    )

    return event ? {...event[0].data, _id: event[0].ref.id} : null
}

export const verifyUniqueTime = async ({year, month}:CreateEventValues):Promise<boolean> => {

    const unique:boolean = await client.query(
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

export const createEvent = async (values:CreateEventValues):Promise<OrganizedDBClubEvent> => {

    const data = {...values, bookName: '', bookAuthor: '', bookDesc: '', bookImage: '', posts: [], meetings: []}

    const newEvent:DBClubEvent = await client.query(
        q.Create(q.Collection('clubEvents'), {data})
    )
    
    return {...newEvent.data, _id: newEvent.ref.id}
}

export const updateEvent = async (values:ClientClubEvent) => {
    const copy = {...values}
    delete copy._id 

    await client.query(
        q.Update(q.Ref(q.Collection('clubEvents'), values._id), {
            data: copy
        })
    )
}