import {NextApiRequest, NextApiResponse} from 'next'
import {getAllTimePeriods, addTimePeriod, modifyTimePeriod, deleteTimePeriod} from '../../../utils/timePeriods'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function timePeriod(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const periods = await getAllTimePeriods()
            return res.status(200).json(periods)
        }

        const {operation, values, id} = req.body

        if(operation === 'create') {
            const newPeriod = await addTimePeriod(values)
            return res.status(200).json({period: newPeriod})
        }
        if(operation === 'modify') {
            await modifyTimePeriod(id, values)
            return res.status(200).json({msg: 'Successful update'})
        }
        if(operation === 'delete') {
            await deleteTimePeriod(id)
            return res.status(200).json({msg: 'Successful deletion'})
        }

        return res.status(422).json({msg: 'Invalid request'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
})