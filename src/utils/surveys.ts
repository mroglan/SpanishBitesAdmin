import {DBSurvey, OrganizedDBSurvey} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const getSurvey = async (name:string):Promise<OrganizedDBSurvey> => {

    const survey:DBSurvey = await client.query(
        q.Get(q.Match(q.Index('surveys_by_name'), name))
    )

    return {...survey.data, _id:survey.ref.id}
}