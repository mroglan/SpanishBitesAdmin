import {NextApiRequest, NextApiResponse} from 'next'
import {getAllPassages, createPassage, modifyPassage, deletePassage} from '../../../utils/passages'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function passage(req:NextApiRequest, res:NextApiResponse) {

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
})