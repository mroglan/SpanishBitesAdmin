import {GetServerSideProps} from 'next'
import {getAllTimePeriods} from '../utils/timePeriods'
import axios from 'axios'
import { getAllAuthors } from '../utils/authors'
import { getAllGenres } from '../utils/genres'
import { getAllBooks } from '../utils/books'
import {getAllPassages} from '../utils/passages'
import {getAllBites} from '../utils/bites'

export default function PlayGround({timePeriods, authors, genres, books, passages, bites}) {

    console.log(bites)

    const updateTimePeriods = async () => {
        try {
            const {data} = await axios({
                method: 'POST',
                url: '/api/fauna/timeperiods',
                data: {
                    data: timePeriods
                }
            })

            console.log(data)
        } catch(e) {
            console.log(e)
        }
    }

    const updateAuthors = async () => {
        try {
            const {data} = await axios({
                method: 'POST',
                url: '/api/fauna/authors',
                data: {
                    data: authors
                }
            })
            console.log(data)
        } catch(e) {
            console.log(e)
        }
    }

    const updateGenres = async () => {
        try {
            const {data} = await axios({
                method: 'POST',
                url: '/api/fauna/genres',
                data: {
                    data: genres
                }
            })
            console.log(data)
        } catch(e) {
            console.log(e)
        }
    }

    const updateBooks = async () => {
        try {
            const {data} = await axios({
                method: 'POST',
                url: '/api/fauna/books',
                data: {
                    data: books
                }
            })
            console.log(data)
        } catch(e) {
            console.log(e)
        }
    }

    const updatePassages = async () => {
        try {
            const {data} = await axios({
                method: 'POST',
                url: '/api/fauna/passages',
                data: {
                    data: passages
                }
            })
            console.log(data)
        } catch(e) {
            console.log(e)
        }
    }

    const updateBites = async () => {
        try {
            const {data} = await axios({
                method: 'POST',
                url: '/api/fauna/bites', 
                data: {
                    data: bites
                }
            })
            console.log(data)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <button onClick={() => updateTimePeriods()}>
                move time period data
            </button>
            <button onClick={() => updateAuthors()}>
                move author data
            </button>
            <button onClick={() => updateGenres()}>
                move genre data
            </button>
            <button onClick={() => updateBooks()}>
                move book data
            </button>
            <button onClick={() => updatePassages()}>
                move passage data
            </button>
            <button onClick={() => updateBites()}>
                move bite data
            </button>
        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async () => {

    // const timePeriods = await getAllTimePeriods()

    // const authors = await getAllAuthors()

    // const genres = await getAllGenres()

    // const books = await getAllBooks()

    // const passages = await getAllPassages()

    // const bites = await getAllBites()

    return {props: {timePeriods: null, authors: null, genres: null, books: null, passages: null,
        bites: null
    }}
}