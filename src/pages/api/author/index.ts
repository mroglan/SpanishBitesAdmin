import {NextApiRequest, NextApiResponse} from 'next'
import {getAllAuthors, addAuthor, modifyAuthor, deleteAuthor} from '../../../utils/authors'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function author(req:NextApiRequest, res:NextApiResponse) {

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
})