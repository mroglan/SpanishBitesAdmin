import database from '../database/database'
import {DBDailyEvent} from '../database/dbInterfaces'

export const getAllDailyEvents = async () => {
    const db = await database()

    const events:DBDailyEvent[] = await db.collection('dailyEvents').find({}).toArray()

    return events
}