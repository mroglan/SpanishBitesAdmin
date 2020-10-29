import database from '../database/database'
import {Values} from '../components/blog/edit/PostForm'

export const updateBlogPost = async (values:Values) => {

    const {_id} = values

    const db = await database()

    await db.collection('blogPosts').updateOne({'_id': _id}, {'$set': {...values}}, {upsert: true})
}