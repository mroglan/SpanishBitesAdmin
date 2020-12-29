import { NextApiResponse, NextApiRequest } from "next";
import {verifyAdmin} from '../../../utils/auth'
import database from '../../../database/database'
import backupDatabase from '../../../database/backupDatabase'
import {Db} from 'mongodb'

const collections = ['authors', 'bites', 'blogPosts', 'books', 'dailyEvents', 'genres', 'images', 'passages', 'timePeriods', 'users']

async function updateItem(name:string, item:any, db:Db) {
    await db.collection(name).updateOne({'_id': item._id}, {'$set': {...item}}, {upsert: true})
}

function updateCollection(name:string, items:any[], db:Db) {
    return Promise.all(items.map(item => updateItem(name, item, db)))
}

function searchCollection(name:string, db:Db) {
    return db.collection(name).find({}).toArray()
}

export default verifyAdmin(async function Backup(req:NextApiRequest, res:NextApiResponse) {

    try {
        const [db, backupDB] = await Promise.all([database(), backupDatabase()])

        const [authors, bites, blogPosts, books, dailyEvents, genres, images, passages, timePeriods, users] = 
        await Promise.all(collections.map(collection => searchCollection(collection, db)))

        await Promise.all([updateCollection('authors', authors, backupDB), updateCollection('bites', bites, backupDB), 
        updateCollection('blogPosts', blogPosts, backupDB), updateCollection('books', books, backupDB), 
        updateCollection('dailyEvents', dailyEvents, backupDB), updateCollection('genres', genres, backupDB), 
        updateCollection('images', images, backupDB), updateCollection('passages', passages, backupDB),
        updateCollection('timePeriods', timePeriods, backupDB), updateCollection('users', users, backupDB)])

        return res.status(200).json({msg: 'ok jose'})
    } catch(e) {
        return res.status(500).json({msg: 'not ok'})
    }
    
})