import { NextApiResponse, NextApiRequest } from "next";
import {client} from '../../../database/fauna-db'
import {query as q} from 'faunadb'

export default async function Books(req:NextApiRequest, res:NextApiResponse) {

    try {

        // const data = req.body.data.map(d => {
        //     delete d._id
        //     return {data: {...d, timePeriod: '', genres: [], authors: []}}
        // })

        // await client.query(
        //     q.Map(data, q.Lambda(['d'], q.Create(q.Collection('books'), q.Var('d'))))
        // )

        return res.status(200).json({msg: 'done'})
    } catch(e) {
        return res.status(500).json({e})
    }
}