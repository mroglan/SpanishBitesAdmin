import database from '../database/database'
import {Values} from '../components/blog/edit/PostForm'
import {DBBlogPost} from '../database/dbInterfaces'

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

export const getAllPosts = async () => {

    const db = await database()

    const posts:DBBlogPost[] = await db.collection('blogPosts').find({}).toArray()

    const sortedPosts = posts.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())

    return sortedPosts
}