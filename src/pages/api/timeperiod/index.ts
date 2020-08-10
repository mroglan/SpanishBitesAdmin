import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {TimePeriod, DBTimePeriod} from '../../../database/dbInterfaces'
import {getAllTimePeriods} from '../../../utils/timePeriods'
import {verifyAdmin} from '../../../utils/auth'
import {ObjectId} from 'mongodb'

const addTimePeriod = async (values:TimePeriod) => {
    const db = await database()

    const dbOperation = await db.collection('timePeriods').insertOne(values)

    return <DBTimePeriod>dbOperation.ops[0]
}

const modifyTimePeriod = async (id:string, values:TimePeriod) => {
    const db = await database()

    await db.collection('timePeriods').updateOne({'_id': new ObjectId(id)}, {'$set': {...values}})
}

const deleteTimePeriod = async (id:string) => {
    const db = await database()
    
    await db.collection('timePeriods').deleteOne({'_id': new ObjectId(id)})
}

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