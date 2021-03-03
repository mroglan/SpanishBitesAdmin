import database from '../database/database'
import {Values} from '../components/blog/edit/PostForm'
import {DBBlogPost} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const updateBlogPost = async (values:Values) => {

    const db = await database()

    // const dbValues = {...values, _id: new ObjectId(values._id)}
    
    // await db.collection('blogPosts').updateOne({'_id': dbValues._id}, {'$set': {...dbValues}})

    const id = values._id
    delete values._id

    await client.query(
        q.Update(q.Ref(q.Collection('blogPosts'), id), {data: values})
    )
}

export const createBlogPost = async(values:Values) => {

    // const db = await database()

    const cleanedValues = {...values}
    delete cleanedValues._id

    // await db.collection('blogPosts').insertOne({...cleanedValues})

    await client.query(
        q.Create(q.Collection('blogPosts'), {data: cleanedValues})
    )
}

export const deleteBlogPost = async (id:string) => {

    // const db = await database()

    // await db.collection('blogPosts').deleteOne({'_id': new ObjectId(id)})

    await client.query(
        q.Delete(q.Ref(q.Collection('blogPosts'), id))
    )
}

export const getAllPosts = async () => {

    // const db = await database()

    // const posts:DBBlogPost[] = await db.collection('blogPosts').find({}).toArray()

    const posts:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_blogPosts')), {size: 1000}), (ref) => q.Get(ref))
    )

    const sortedPosts = posts.data.map(d => ({...d.data, _id: d.ref.id})).sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())

    return sortedPosts
}

export const getBlogPost = async (id:string) => {
    
    // const db = await database()

    // const post:DBBlogPost = await db.collection('blogPosts').findOne({'_id': new ObjectId(id)})

    // return post

    const post:any = await client.query(
        q.Get(q.Ref(q.Collection('blogPosts'), id))
    )

    return {...post.data, _id: post.ref.id}
}