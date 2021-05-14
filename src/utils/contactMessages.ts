import {DBContactMessage, OrganizedDBContactMessage, ContactMessage} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const getAllContactMessages = async ():Promise<OrganizedDBContactMessage[]> => {

    const msgs:{data: DBContactMessage[]} = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_contactMessages'))), (ref) => q.Get(ref))
    )

    return msgs.data.map(msg => ({...msg.data, _id: msg.ref.id}))
}

export const updateMessage = async (id:string, values:ContactMessage) => {

    await client.query(
        q.Update(q.Ref(q.Collection('contactMessages'), id), {
            data: values
        })
    )
}

export const deleteMessage = async (id:string) => {

    await client.query(
        q.Delete(q.Ref(q.Collection('contactMessages'), id))
    )
}

export const deleteMultipleMessages = async (ids:string[]) => {

    await client.query(
        q.Map(ids, id => q.Delete(q.Ref(q.Collection('contactMessages'), id)))
    )
}