import {MongoClient} from 'mongodb'

const client = new MongoClient(`mongodb+srv://Manuel:${process.env.DATABASE_PASS}@cluster0.5eaee.mongodb.net/spanishBites`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default async function database() {
    if(!client.isConnected()) await client.connect()
    const db = client.db('spanishBites')
    return db
}