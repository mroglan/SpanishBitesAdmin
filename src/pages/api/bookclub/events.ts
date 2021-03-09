import {NextApiRequest, NextApiResponse} from 'next'
import {getAllEvents, createEvent, verifyUniqueTime, updateEvent} from '../../../utils/clubEvents'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function BookClubEvents(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const events = await getAllEvents()
            return res.status(200).json(events)
        }

        const {operation, values, id} = req.body

        if(operation === 'create') {
            const isUnique = await verifyUniqueTime(values)
            if(!isUnique) return res.status(400).json({msg: 'Not unique'})
            const newEvent = await createEvent(values)
            return res.status(200).json({month: newEvent.month, year: newEvent.year})
        }

        if(operation === 'update') {
            await updateEvent(values)
            return res.status(200).json({msg: 'Successful update'})
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
})