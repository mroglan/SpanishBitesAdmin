import {DBDailyEvent} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

interface Event {
    date: string;
    bite: string;
}

const objectifyValues = (values) => {

    return {...values, bite: q.Ref(q.Collection('bites'), values.bite)}
}

export const createEvent = async (date, bite) => {
    
    await client.query(
        q.Create(q.Collection('dailyEvents'), {data: {...objectifyValues({date, bite})}})
    )
}

export const updateEvent = async (date:string, bite:string, id:string) => {

    await client.query(
        q.Update(q.Ref(q.Collection('dailyEvents'), id), {data: {...objectifyValues({date, bite})}})
    )
}

export const insertManyEvents = async (events:Event[]) => {
    if(events.length === 0) return 

    const objectVals = events.map(event => objectifyValues(event))

    await client.query(
        q.Map(objectVals, q.Lambda(['event'], q.Create(q.Collection('dailyEvents'), {data: q.Var('event')})))
    )
}

export const getAllDailyEvents = async () => {

    const events:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_dailyEvents')), {size: 10000}), (ref) => q.Get(ref))
    )

    return events.data.map(d => ({
        ...d.data, _id: d.ref.id,
        bite: d.data.bite?.id || ''
    }))
}