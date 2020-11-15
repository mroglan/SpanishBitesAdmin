import database from '../database/database'
import {DBTimePeriod, TimePeriod} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

export const addTimePeriod = async (values:TimePeriod) => {
    const db = await database()

    const dbOperation = await db.collection('timePeriods').insertOne(values)

    return <DBTimePeriod>dbOperation.ops[0]
}

export const modifyTimePeriod = async (id:string, values:TimePeriod) => {
    const db = await database()

    await db.collection('timePeriods').updateOne({'_id': new ObjectId(id)}, {'$set': {...values}})
}

export const deleteTimePeriod = async (id:string) => {
    const db = await database()
    
    await db.collection('timePeriods').deleteOne({'_id': new ObjectId(id)})
}

export const getAllTimePeriods = async () => {
    const db = await database()

    const timePeriods:DBTimePeriod[] = await db.collection('timePeriods').find({}).toArray()

    return timePeriods.sort((a, b) => Number(a.dateRange[0]) - Number(b.dateRange[0]))
}