import {NextApiRequest, NextApiResponse} from 'next'
import {client} from '../../database/fauna-db'
import {query as q} from 'faunadb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function login(req:NextApiRequest, res:NextApiResponse) {

    try {

        const user:any = await client.query(
            q.If(
                q.Exists(q.Match(q.Index('users_by_username'), req.body.username)),
                q.Get(q.Match(q.Index('users_by_username'), req.body.username)),
                null
            )
        )

        if(!user) {
            return res.status(403).json({msg: 'Username not found'})
        }
        if(!user.data.isVerified) {
            return res.status(403).json({msg: 'User is not verified'})
        }
        if(!user.data.isAdmin) {
            return res.status(403).json({msg: 'You are not an Admin!'})
        }

        const match = await new Promise((resolve, reject) => {
            bcrypt.compare(req.body.password, user.data.password, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })

        if(!match) {
            return res.status(403).json({msg: 'Incorrect Password'})
        }

        const claims = {
            _id: user.ref._id,
            username: user.data.username,
            email: user.data.email,
            isAdmin: user.data.isAdmin
        }

        const token = jwt.sign(claims, process.env.SIGNATURE, {expiresIn: '48hr'})

        res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 172800,
            path: '/'
        }))
        
        return res.status(200).json({msg: 'Logging in...'})
    } catch(e) {    
        console.log(e)
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}