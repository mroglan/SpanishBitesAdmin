import {Paper, Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer} from 'react'
import {ClientPassage, ClientBook} from '../../database/dbInterfaces'
import {SuccessButton} from '../items/buttons'
import SnackbarMessage from '../items/SnackbarMessage'
import axios from 'axios'
import {mutate} from 'swr'

import valuesReducer from './valuesReducer'
import PassageForm from './PassageForm'

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
    passages: ClientPassage[];
    books: ClientBook[];
}

const initialValues = {
    name: '',
    desc: '',
    book: '',
    englishText: '',
    spanishText: '',
    commentary: '',
    vocab: [],
    annotations: ''
}

export default function AddPassage({passages, books}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, initialValues)

    const [message, setMessage] = useState({type: '', content: ''})

    const [loading, setLoading] = useState(false)

    const createPassage = async () => {
        setLoading(true)

        const {data: {passage}, status} = await axios({
            method: 'POST',
            url: '/api/passage',
            data: {
                operation: 'create',
                values
            }
        })

        setLoading(false)

        if(status !== 200) {
            setMessage({type: 'error', content: 'Error Saving'})
            return 
        }

        setMessage({type: 'success', content: 'Passage Created'})
        valuesDispatch({type: 'CLEAR_VALUES', payload: {}})
        mutate('/api/passage', [...passages, passage], false)
    }

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    New Passage
                </Typography>
            </Box>
            <Box mt={3}>
                <PassageForm values={values} valuesDispatch={valuesDispatch} books={books} />
            </Box>
            <Box mt={3}>
                <SuccessButton disabled={loading} onClick={() => createPassage()} variant="outlined">
                    Create Passage
                </SuccessButton>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}