import {NextApiRequest, NextApiResponse} from 'next'
import {getAllDailyEvents, updateEvent, insertManyEvents} from '../../../utils/dailyEvents'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function dailyEvent(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const events = await getAllDailyEvents()
            return res.status(200).json(events)
        }

        const {operation, date, bite, events} = req.body

        if(operation === 'update') {
            await updateEvent(date, bite)
            return res.status(200).json({msg: 'Successful update'})
        }

        if(operation === 'insertMany') {
            await insertManyEvents(events)
            return res.status(200).json({msg: 'Successful insertions'})
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
})