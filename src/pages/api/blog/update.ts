import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {updateBlogPost} from '../../../utils/blogPosts'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function UpdatePost(req:NextApiRequest, res:NextApiResponse) {

    try {

        await updateBlogPost(req.body.values)

        return res.status(200).json({msg: 'Successsful update'})
    } catch(e) {

        return res.status(500).json({msg: 'Internal Server Error'})
    }
})