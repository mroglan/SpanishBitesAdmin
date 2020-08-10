import {GetServerSidePropsContext} from 'next'
import jwt from 'jsonwebtoken'
import Router from 'next/router'
import {parseCookies} from 'nookies'

const redirectTo = (ctx:GetServerSidePropsContext, url:string) => {
    if(!ctx.req) {
        Router.replace('url')
    } else {
        ctx.res.writeHead(302, {
            Location: `${process.env.BASE_URL}${url}`
        })
        ctx.res?.end()
    }
}

export async function ensureAuth(ctx:GetServerSidePropsContext) {

    try {
        const {auth} = parseCookies(ctx)

        await new Promise((resolve, reject) => {
            jwt.verify(auth, process.env.SIGNATURE, (err, decoded) => {
                if(!err && decoded) resolve(decoded)
                reject('Not Authenticated')
            })
        })
    } catch(e) {
        redirectTo(ctx, '/login')
        return {}
    }
}

export async function ensureNotAuth(ctx:GetServerSidePropsContext) {

    try {
        const {auth} = parseCookies(ctx)

        await new Promise((resolve, reject) => {
            jwt.verify(auth, process.env.SIGNATURE, (err, decoded) => {
                if(err || !decoded) resolve('Not Authenticated')
                reject('Authenticated')
            })
        })
    } catch(e) {
        redirectTo(ctx, '/')
        return {}
    }
}