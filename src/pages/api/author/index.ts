import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {Author, DBAuthor} from '../../../database/dbInterfaces'
import {getAllAuthors} from '../../../utils/authors'
import {ObjectId} from 'mongodb'

interface Values extends Author {
    timePeriod: string;
}

const addAuthor = async (values:Values) => {
    const db = await database()

    const dbValues = {...values, timePeriod: values.timePeriod ? new ObjectId(values.timePeriod) : ''}

    const dbOperation = await db.collection('authors').insertOne(dbValues)

    return <DBAuthor>dbOperation.ops[0]
}

const modifyAuthor = async (id:string, values:Values) => {
    const db = await database()

    await db.collection('authors').updateOne({'_id': new ObjectId(id)}, {'$set': {...values}})
}

const deleteAuthor = async (id:string) => {
    const db = await database()

    await db.collection('authors').deleteOne({'_id': new ObjectId(id)})
}

export default async function author(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const authors = await getAllAuthors()
            return res.status(200).json(authors)
        }

        const {operation, values, id} = req.body

        if(operation === 'create') {
            const author = await addAuthor(values)
            return res.status(200).json({author})
        }
        if(operation === 'modify') {
            await modifyAuthor(id, values)
            return res.status(200).json({msg: 'Successful update'})
        }
        if(operation === 'delete') {
            await deleteAuthor(id)
            return res.status(200).json({msg: 'Successful deletion'})
        }
        
        return res.status(422).json({msg: 'Invalid request'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}