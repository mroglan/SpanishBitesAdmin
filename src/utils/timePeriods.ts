import database from '../database/database'
import {DBTimePeriod, TimePeriod} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const addTimePeriod = async (values:TimePeriod) => {

    const newPeriod:any = await client.query(
        q.Create(q.Collection('timePeriods'), {data: values})
    )

    return {...newPeriod.data, _id: newPeriod.ref.id}
}

export const modifyTimePeriod = async (id:string, values:TimePeriod) => {

    await client.query(
        q.Update(q.Ref(q.Collection('timePeriods'), id), {
            data: values
        })
    )
}

export const deleteTimePeriod = async (id:string) => {

    await client.query(
        q.Delete(q.Ref(q.Collection('timePeriods'), id))
    )
}

export const getAllTimePeriods = async () => {

    const timePeriods:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_timePeriods'))), (ref) => q.Get(ref))
    )

    return timePeriods.data.map(period => ({...period.data, _id: period.ref.id})).sort((a, b) => Number(a.dateRange[0]) - Number(b.dateRange[0]))
}