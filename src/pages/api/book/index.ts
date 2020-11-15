import {NextApiRequest, NextApiResponse} from 'next'
import {getAllBooks, createBook, updateBook, deleteBook} from '../../../utils/books'
import {verifyAdmin} from '../../../utils/auth'

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