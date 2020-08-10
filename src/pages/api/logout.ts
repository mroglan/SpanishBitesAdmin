import {NextApiRequest, NextApiResponse} from 'next'
import cookie from 'cookie'

export default function Logout(req:NextApiRequest, res:NextApiResponse) {

    res.setHeader('Set-Cookie', cookie.serialize('auth', 'bye bye', {
        maxAge: 0,
        path: '/',
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict'
    }))

    res.status(200).json({msg: 'Logging out...'})
}