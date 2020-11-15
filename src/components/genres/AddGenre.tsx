import {Paper, Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer} from 'react'
import {ClientGenre} from '../../database/dbInterfaces'
import {SuccessButton} from '../items/buttons'
import SnackbarMessage from '../items/SnackbarMessage'
import GenreForm from './GenreForm'
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
    genres: ClientGenre[];
}

const initialValues = {
    name: ''
}

export default function AddGenre({genres}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, initialValues)

    const [message, setMessage] = useState({type: '', content: ''})

    const [loading, setLoading] = useState(false)

    const createGenre = async () => {
        setLoading(true)

        try {
            const {data: {genre}} = await axios({
                method: 'POST',
                url: '/api/genre',
                data: {
                    operation: 'create',
                    values
                }
            })

            setLoading(false)

            setMessage({type: 'success', content: 'Genre Created'})
            valuesDispatch({type: 'CLEAR_VALUES', payload: {}})
            mutate('/api/genre', [...genres, genre], false)
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
                    New Genre
                </Typography>
            </Box>
            <Box mt={3}>
                <GenreForm values={values} valuesDispatch={valuesDispatch} />
            </Box>
            <Box mt={3}>
                <SuccessButton disabled={loading} onClick={() => createGenre()} variant="outlined">
                    Create Genre
                </SuccessButton>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}