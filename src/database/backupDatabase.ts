import {MongoClient} from 'mongodb'

const client = new MongoClient(`mongodb+srv://Manuel:${process.env.BACKUP_DATABASE_PASS}@cluster0.noscf.mongodb.net/SpanishBites`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default async function database() {
    if(!client.isConnected()) await client.connect()
    const db = client.db('SpanishBites')
    return db
}