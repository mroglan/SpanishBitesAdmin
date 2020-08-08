import {Paper, Box, Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer, useMemo} from 'react'
import {ClientTimePeriod, ClientAuthor, ClientGenre} from '../../database/dbInterfaces'
import BookForm from './BookForm'
import {SuccessButton, ErrorButton} from '../items/buttons'
import SnackbarMessage from '../items/SnackbarMessage'
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
    books: any;
    bookIndex: number;
    timePeriods: ClientTimePeriod[];
    authors: ClientAuthor[];
    genres: ClientGenre[];
}

export default function ModifyBook({books, bookIndex, timePeriods, authors, genres}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, books[bookIndex])

    const [message, setMessage] = useState({type: '', content: ''})

    useMemo(() => {
        valuesDispatch({type: 'CHANGE_INITIAL_VALUES', payload: books[bookIndex]})
    }, [books, bookIndex])

    const [loading, setLoading] = useState(false)

    const updateBook = async () => {
        setLoading(true)

        const valuesCopy = {...values}
        delete valuesCopy._id

        const {status} = await axios({
            method: 'POST',
            url: '/api/book',
            data: {
                operation: 'modify',
                values: valuesCopy,
                id: values._id
            }
        })

        setLoading(false)

        if(status !== 200) {
            setMessage({type: 'error', content: 'Error Saving'})
            return
        }

        setMessage({type: 'success', content: 'Changes Saved'})
        const booksCopy = [...books]
        booksCopy[bookIndex] = values

        mutate('/api/book', booksCopy, false)
    }

    const deleteBook = async () => {
        setLoading(true)

        const {status} = await axios({
            method: 'POST',
            url: '/api/book',
            data: {
                operation: 'delete',
                id: values._id
            }
        })

        setLoading(false)

        if(status !== 200) {
            setMessage({type: 'error', content: 'Error Deleting'})
            return
        }

        setMessage({type: 'success', content: 'Book Deleted'})

        valuesDispatch({type: 'CLEAR_VALUES', payload: {}})

        const booksCopy = [...books]
        booksCopy.splice(bookIndex, 1)

        mutate('/api/book', booksCopy, false)
    }

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    Modify Book
                </Typography>
            </Box>
            <Box mt={3}>
                <BookForm values={values} valuesDispatch={valuesDispatch} authors={authors} genres={genres} timePeriods={timePeriods} />
            </Box>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton disabled={loading} onClick={() => updateBook()} variant="outlined">
                            Update
                        </SuccessButton>
                    </Grid>
                    <Grid item>
                        <ErrorButton disabled={loading} variant="outlined" onClick={() => deleteBook()}>
                            Delete
                        </ErrorButton>
                    </Grid>
                </Grid>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}