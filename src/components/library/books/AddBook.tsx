import {Paper, Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer} from 'react'
import {ClientTimePeriod, ClientAuthor, ClientUnpopulatedBook, ClientGenre} from '../../../database/dbInterfaces'
import {SuccessButton} from '../../items/buttons'
import SnackbarMessage from '../../items/SnackbarMessage'
import BookForm from './BookForm'
import valuesReducer from './valuesReducer'
import axios from 'axios'
import {mutate} from 'swr'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    titleBox: {
        display: 'inline-block',
        borderBottom: `3px solid ${theme.palette.secondary.main}`,
        paddingRight: theme.spacing(1)
    }
}))

interface Props {
    timePeriods: ClientTimePeriod[];
    authors: ClientAuthor[];
    genres: ClientGenre[];
    books: ClientUnpopulatedBook[];
}

const initialValues = {
    title: '',
    authors: [],
    genres: [],
    timePeriod: '',
    desc: '',
    detailedInfo: '',
    image: ''
}

export default function AddBook({timePeriods, authors, genres, books}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, initialValues)

    const [message, setMessage] = useState({type: '', content: ''})

    const [loading, setLoading] = useState(false)

    const createBook = async () => {
        setLoading(true)

        try {
            const {data: {book}} = await axios({
                method: 'POST',
                url: '/api/book',
                data: {
                    operation: 'create',
                    values
                }
            })
            setLoading(false)

            setMessage({type: 'success', content: 'Book Created'})
            valuesDispatch({type: 'CLEAR_VALUES', payload: {}})
            mutate('/api/book', [...books, book], false)
        } catch(e) {
            setLoading(false)
            setMessage({type: 'error', content: 'Error Saving'})
            return
        }
    }

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    New Book
                </Typography>
            </Box>
            <Box mt={3}>
                <BookForm values={values} valuesDispatch={valuesDispatch} authors={authors}
                genres={genres} timePeriods={timePeriods} />
            </Box>
            <Box mt={3}>
                <SuccessButton disabled={loading} onClick={() => createBook()} variant="outlined">
                    Create Book
                </SuccessButton>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}