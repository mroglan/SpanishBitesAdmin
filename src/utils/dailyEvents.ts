import database from '../database/database'
import {DBDailyEvent} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

interface Event {
    date: string;
    bite: string;
}

export const updateEvent = async (date:string, bite:string) => {
    const db = await database()

    await db.collection('dailyEvents').updateOne({'date': new Date(date)}, {'$set': {'bite': new ObjectId(bite)}}, {upsert: true})
}

export const insertManyEvents = async (events:Event[]) => {
    if(events.length === 0) return 
    const dbEvents = events.map(event => ({date: new Date(event.date), bite: new ObjectId(event.bite)}))

    const db = await database()

    await db.collection('dailyEvents').insertMany(dbEvents)
}

export const getAllDailyEvents = async () => {
    const db = await database()

    const events:DBDailyEvent[] = await db.collection('dailyEvents').find({}).toArray()

    return events
}