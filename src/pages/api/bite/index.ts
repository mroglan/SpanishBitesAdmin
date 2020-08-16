import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {ClientSpanishBite, DBSpanishBite} from '../../../database/dbInterfaces'
import {getAllBites} from '../../../utils/bites'
import {verifyAdmin} from '../../../utils/auth'
import {ObjectId} from 'mongodb'

interface Values extends Omit<ClientSpanishBite, '_id'> {}

const createBite = async (values:Values) => {
    const db = await database()

    const dbOperation = await db.collection('bites').insertOne(values)

    return <DBSpanishBite>dbOperation.ops[0]
}

const modifyBite = async (id:string, values:Values) => {
    const db = await database()

    await db.collection('bites').updateOne({'_id': new ObjectId(id)}, {'$set': {...values}})
}

const deleteBite = async (id:string) => {
    const db = await database()

    await db.collection('bites').deleteOne({'_id': new ObjectId(id)})
}

export default async function bite(req:NextApiRequest, res:NextApiResponse) {

    try {   

        if(req.method === 'GET') {
            const bites = await getAllBites() 
            return res.status(200).json(bites)
        }

        const {operation, values, id} = req.body

        if(operation === 'create') {
            const newBite = await createBite(values)
            return res.status(200).json({bite: newBite})
        }
        if(operation === 'modify') {
            await modifyBite(id, values)
            return res.status(200).json({msg: 'Successful update'})
        }
        if(operation === 'delete') {
            await deleteBite(id)
            return res.status(200).json({msg: 'Successful deletion'})
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}