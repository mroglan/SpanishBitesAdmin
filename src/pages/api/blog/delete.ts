import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {deleteBlogPost} from '../../../utils/blogPosts'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function DeletePost(req:NextApiRequest, res:NextApiResponse) {

    try {

        const {id} = req.body
        
        await deleteBlogPost(id)

        return res.status(200).json({msg: 'Successful deletion.'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal Server Error'})
    }
})