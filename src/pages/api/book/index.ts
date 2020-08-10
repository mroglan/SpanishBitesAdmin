import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {ClientBook, DBBook} from '../../../database/dbInterfaces'
import {getAllBooks} from '../../../utils/books'
import {verifyAdmin} from '../../../utils/auth'
import {ObjectId} from 'mongodb'

interface Values extends Omit<ClientBook, '_id'> {}

const objectifyValues = (values:Values) => {
    if(!values.authors || !values.genres || !values.timePeriod) return values
    return {
        ...values,
        authors: values.authors.map(author => new ObjectId(author)),
        genres: values.genres.map(genre => new ObjectId(genre)),
        timePeriod: new ObjectId(values.timePeriod)
    }
}

const createBook = async (values:Values) => {
    const db = await database()

    const objectIdVals = objectifyValues(values)

    const dbOperation = await db.collection('books').insertOne(objectIdVals)

    return <DBBook>dbOperation.ops[0]
}

const updateBook = async (id:string, values:Values) => {
    const db = await database()

    const objectIdVals = objectifyValues(values)

    await db.collection('books').updateOne({'_id': new ObjectId(id)}, {'$set': {...objectIdVals}})
}

const deleteBook = async (id:string) => {
    const db = await database()

    await db.collection('books').deleteOne({'_id': new ObjectId(id)})
}

export default verifyAdmin(async function book(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const books = await getAllBooks()
            return res.status(200).json(books)
        }

        const {operation, values, id} = req.body

        if(operation === 'create') {
            const newBook = await createBook(values)
            return res.status(200).json({book: newBook})
        }
        if(operation === 'modify') {
            await updateBook(id, values)
            return res.status(200).json({msg: 'Successful update'})
        }
        if(operation === 'delete') {
            await deleteBook(id)
            return res.status(200).json({msg: 'Successful deletion'})
        }
        
        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
})