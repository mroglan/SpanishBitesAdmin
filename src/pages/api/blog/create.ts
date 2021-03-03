import {NextApiRequest, NextApiResponse} from 'next'
import {createBlogPost} from '../../../utils/blogPosts'
import {verifyAdmin} from '../../../utils/auth'

export default verifyAdmin(async function CreateBlog(req:NextApiRequest, res:NextApiResponse) {

    try {

        await createBlogPost(req.body.values)

        return res.status(200).json({msg: 'Successful creation!'})
    } catch(e) {

        return res.status(500).json({msg: 'Internal Server Error'})
    }
})