import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../../database/database'
import {createBlogPost} from '../../../utils/blogPosts'

export default async function CreateBlog(req:NextApiRequest, res:NextApiResponse) {

    try {

        await createBlogPost(req.body.values)

        return res.status(200).json({msg: 'Successful creation!'})
    } catch(e) {

        return res.status(500).json({msg: 'Internal Server Error'})
    }
}