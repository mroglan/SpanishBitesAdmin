import { NextApiResponse, NextApiRequest } from "next";
import {client} from '../../../database/fauna-db'
import {query as q} from 'faunadb'

export default async function FindUser(req:NextApiRequest, res:NextApiResponse) {

    try {

        console.log('username', req.body.username)

        const user = await client.query(
            q.If(
                q.Exists(q.Match(q.Index('users_by_username'), req.body.username)),
                q.Get(q.Match(q.Index('users_by_username'), req.body.username)),
                null
            )
        )

        console.log('user', user)

        return res.status(200).json({user})
    } catch(e) {
        return res.status(500).json({e})
    }
}