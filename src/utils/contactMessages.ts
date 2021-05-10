import {DBContactMessage, OrganizedDBContactMessage} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const getAllContactMessages = async ():Promise<OrganizedDBContactMessage[]> => {

    const msgs:{data: DBContactMessage[]} = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_contactMessages'))), (ref) => q.Get(ref))
    )

    return msgs.data.map(msg => ({...msg.data, _id: msg.ref.id}))
}