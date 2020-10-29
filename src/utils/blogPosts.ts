import database from '../database/database'
import {Values} from '../components/blog/edit/PostForm'

export const updateBlogPost = async (values:Values) => {

    const db = await database()
    
    await db.collection('blogPosts').updateOne({'_id': values._id}, {'$set': {...values}})
}

export const createBlogPost = async(values:Values) => {

    const db = await database()

    const cleanedValues = {...values}
    delete cleanedValues._id

    await db.collection('blogPosts').insertOne({...cleanedValues})
}