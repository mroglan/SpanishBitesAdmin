import {NextApiRequest, NextApiResponse} from 'next'
import database from '../../database/database'
import {DBUser} from '../../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function login(req:NextApiRequest, res:NextApiResponse) {

    try {
        const db = await database()

        const user:DBUser = await db.collection('users').findOne({'username': req.body.username})

        if(!user) {
            return res.status(403).json({msg: 'Username not found'})
        }
        if(!user.isVerified) {
            return res.status(403).json({msg: 'User is not verified'})
        }

        const match = await new Promise((resolve, reject) => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) reject(err)
                resolve(result)
            })
        })

        if(!match) {
            return res.status(403).json({msg: 'Incorrect Password'})
        }

        const claims = {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
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