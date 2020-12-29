import {useState} from 'react'
import axios from 'axios'

export default function Backup() {

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const backupDB = async () => {
        setLoading(true)
        try {
            await axios({
                method: 'GET',
                url: '/api/backup'
            })
            setMessage('Success')
        } catch(e) {
            setMessage('Error')
        }
        setLoading(false)
    }

    return (
        <div>
            <button onClick={() => backupDB()} >
                Backup the database
            </button>
            {loading && <p>Loading...</p>}
            <p>
                {message}
            </p>
        </div>
    )
}