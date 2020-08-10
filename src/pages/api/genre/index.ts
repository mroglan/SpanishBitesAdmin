import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {Genre, DBGenre} from '../../../database/dbInterfaces'
import {getAllGenres} from '../../../utils/genres'
import {verifyAdmin} from '../../../utils/auth'
import {ObjectId} from 'mongodb'

const addGenre = async (values:Genre) => {
    const db = await database()

    const dbOperation = await db.collection('genres').insertOne(values)

    return <DBGenre>dbOperation.ops[0]
}

const modifyGenre = async (id: string, values:Genre) => {
    const db = await database()

    await db.collection('genres').updateOne({'_id': new ObjectId(id)}, {'$set': {...values}})
}

const deleteGenre = async (id:string) => {
    const db = await database()

    await db.collection('genres').deleteOne({'_id': new ObjectId(id)})
}

export default verifyAdmin(async function genre(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const genres = await getAllGenres()
            return res.status(200).json(genres)
        }

        const {operation, values, id} = req.body

        if(operation === 'create') {
            const newGenre = await addGenre(values)
            return res.status(200).json({genre: newGenre})
        }
        if(operation === 'modify') {
            await modifyGenre(id, values)
            return res.status(200).json({msg: 'Successful update'})
        }
        if(operation === 'delete') {
            await deleteGenre(id)
            return res.status(200).json({msg: 'Successful deletion'})
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
})