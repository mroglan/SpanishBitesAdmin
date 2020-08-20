import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {ClientDailyEvent} from '../../../database/dbInterfaces'
import {getAllDailyEvents} from '../../../utils/dailyEvents'
import {verifyAdmin} from '../../../utils/auth'
import { ObjectId } from 'mongodb'

const updateEvent = async (date:string, bite:string) => {
    const db = await database()

    await db.collection('dailyEvents').updateOne({'date': new Date(date)}, {'$set': {'bite': new ObjectId(bite)}}, {upsert: true})
}

export default verifyAdmin(async function dailyEvent(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const events = await getAllDailyEvents()
            return res.status(200).json(events)
        }

        const {operation, date, bite} = req.body

        if(operation === 'update') {
            await updateEvent(date, bite)
            return res.status(200).json({msg: 'Successful update'})
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
})