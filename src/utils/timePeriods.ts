import database from '../database/database'
import {DBTimePeriod} from '../database/dbInterfaces'

export const getAllTimePeriods = async () => {
    const db = await database()

    const timePeriods:DBTimePeriod[] = await db.collection('timePeriods').find({}).toArray()

    return timePeriods
}