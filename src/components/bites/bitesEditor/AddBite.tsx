import {Paper, Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer} from 'react'
import {ClientAuthor, ClientBook, ClientSpanishBite} from '../../../database/dbInterfaces'
import {SuccessButton} from '../../items/buttons'
import SnackbarMessage from '../../items/SnackbarMessage'
import axios from 'axios'
import {mutate} from 'swr'

import valuesReducer from './valuesReducer'
import BitesForm from './BitesForm'

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
    authors: ClientAuthor[];
    bites: ClientSpanishBite[];
}

const initialValues = {
    name: '',
    author: '',
    image: '',
    work: '',
    text: '',
    desc: '',
    dates: []
}

export default function AddBite({authors, bites}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, initialValues)

    const [message, setMessage] = useState({type: '', content: ''})

    const [loading, setLoading] = useState(false)

    const createBite = async () => {
        setLoading(true)

        const {data: {bite}, status} = await axios({
            method: 'POST',
            url: '/api/bite',
            data: {
                operation: 'create',
                values
            }
        })

        setLoading(true)

        if(status !== 200) {
            setMessage({type: 'error', content: 'Error Saving'})
            return 
        }

        setMessage({type: 'success', content: 'Author Created'})
        valuesDispatch({type: 'CLEAR_VALUES', payload: {}})
        mutate('/api/bite', [...bites, bite], false)
    }   

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    New Bite
                </Typography>
            </Box>
            <Box mt={3}>
                <BitesForm values={values} valuesDispatch={valuesDispatch} authors={authors} />
            </Box>
            <Box mt={3}>
                <SuccessButton disabled={loading} onClick={() => createBite()} variant="outlined">
                    Create Bite
                </SuccessButton>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}