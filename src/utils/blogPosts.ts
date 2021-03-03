import {Values} from '../components/blog/edit/PostForm'
import {DBBlogPost} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const updateBlogPost = async (values:Values) => {

    const id = values._id
    delete values._id

    await client.query(
        q.Update(q.Ref(q.Collection('blogPosts'), id), {data: values})
    )
}

export const createBlogPost = async(values:Values) => {

    const cleanedValues = {...values}
    delete cleanedValues._id

    await client.query(
        q.Create(q.Collection('blogPosts'), {data: cleanedValues})
    )
}

export const deleteBlogPost = async (id:string) => {

    await client.query(
        q.Delete(q.Ref(q.Collection('blogPosts'), id))
    )
}

export const getAllPosts = async () => {

    const posts:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_blogPosts')), {size: 1000}), (ref) => q.Get(ref))
    )

    const sortedPosts = posts.data.map(d => ({...d.data, _id: d.ref.id})).sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())

    return sortedPosts
}

export const getBlogPost = async (id:string) => {

    const post:any = await client.query(
        q.Get(q.Ref(q.Collection('blogPosts'), id))
    )

    return {...post.data, _id: post.ref.id}
}