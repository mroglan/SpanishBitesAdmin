import database from '../database/database'
import {DBTimePeriod, TimePeriod} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const addTimePeriod = async (values:TimePeriod) => {
    // const db = await database()

    // const dbOperation = await db.collection('timePeriods').insertOne(values)

    // return <DBTimePeriod>dbOperation.ops[0]

    const newPeriod:any = await client.query(
        q.Create(q.Collection('timePeriods'), {data: values})
    )

    return {...newPeriod.data, _id: newPeriod.ref.id}
}

export const modifyTimePeriod = async (id:string, values:TimePeriod) => {
    // const db = await database()

    // await db.collection('timePeriods').updateOne({'_id': new ObjectId(id)}, {'$set': {...values}})

    await client.query(
        q.Update(q.Ref(q.Collection('timePeriods'), id), {
            data: values
        })
    )
}

export const deleteTimePeriod = async (id:string) => {
    // const db = await database()
    
    // await db.collection('timePeriods').deleteOne({'_id': new ObjectId(id)})

    await client.query(
        q.Delete(q.Ref(q.Collection('timePeriods'), id))
    )
}

export const getAllTimePeriods = async () => {

    const timePeriods:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_timePeriods'))), (ref) => q.Get(ref))
    )

    return timePeriods.data.map(period => ({...period.data, _id: period.ref.id})).sort((a, b) => Number(a.dateRange[0]) - Number(b.dateRange[0]))

    // const db = await database()

    // const timePeriods:DBTimePeriod[] = await db.collection('timePeriods').find({}).toArray()

    // return timePeriods.sort((a, b) => Number(a.dateRange[0]) - Number(b.dateRange[0]))
}