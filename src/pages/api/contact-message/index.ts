import {NextApiRequest, NextApiResponse} from 'next'
import {getAllContactMessages, updateMessage} from '../../../utils/contactMessages'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function ContactMessage(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const msgs = await getAllContactMessages()
            return res.status(200).json(msgs)
        }

        const {operation, id, values} = req.body

        if(operation === 'update') {
            await updateMessage(id, values)
            return res.status(200).json({msg: 'updated...'})
        }

        return res.status(422).json({msg: 'Invalid request'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
})