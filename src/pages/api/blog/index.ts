import {NextApiRequest, NextApiResponse} from 'next'
import {verifyAdmin} from '../../../utils/auth'
import {getAllPosts} from '../../../utils/blogPosts'

export default verifyAdmin(async function Blog(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const posts = await getAllPosts()
            return res.status(200).json(posts)
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal Server Error'})
    }
})