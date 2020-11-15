import {NextApiRequest, NextApiResponse} from 'next'
import {getAllBites, createBite, modifyBite, deleteBite} from '../../../utils/bites'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function bite(req:NextApiRequest, res:NextApiResponse) {

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
})