import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {ClientPassage, DBPassage} from '../../../database/dbInterfaces'
import {getAllPassages} from '../../../utils/passages'
import {ObjectId} from 'mongodb'

interface Values extends Omit<ClientPassage, '_id'> {}

const objectifyValues = (values:Values) => {
    if(!values.book) return values

    return {...values, book: new ObjectId(values.book)}
}

const createPassage = async (values:Values) => {
    const db = await database()

    const dbOperation = await db.collection('passages').insertOne(objectifyValues(values))

    return <DBPassage>dbOperation.ops[0]
}

const modifyPassage = async (id:string, values:Values) => {
    const db = await database()

    await db.collection('passages').updateOne({'_id': new ObjectId(id)}, {'$set': {...objectifyValues(values)}})
}

const deletePassage = async (id:string) => {
    const db = await database()

    await db.collection('passages').deleteOne({'_id': new ObjectId(id)})
}

export default async function passage(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const passages = await getAllPassages() 
            return res.status(200).json(passages)
        }

        const {operation, values, id} = req.body

        if(operation === 'create') {
            const newPassage = await createPassage(values)
            return res.status(200).json({passage: newPassage})
        }
        if(operation === 'modify') {
            await modifyPassage(id, values)
            return res.status(200).json({msg: 'Successful update'})
        }
        if(operation === 'delete') {
            await deletePassage(id)
            return res.status(200).json({msg: 'Successful deletion'})
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        console.log(e)
        return res.status(200).json({msg: 'Internal Server Error'})
    }
}