import {Paper, Box, Typography} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer} from 'react'
import {ClientAuthor, ClientTimePeriod} from '../../database/dbInterfaces'
import {SuccessButton} from '../items/buttons'
import SnackbarMessage from '../items/SnackbarMessage'
import axios from 'axios'
import {mutate} from 'swr'

import valuesReducer from './valuesReducer'
import AuthorForm from './AuthorForm'

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
    timePeriods: ClientTimePeriod[];
}

const initialValues = {
    firstName: '',
    lastName: '',
    birthDate: '2020-01-01',
    deathDate: '2020-01-01',
    timePeriod: '',
    detailedInfo: '',
    keyPoints: [''],
    relevantWorks: [],
    influences: []
}

export default function AddAuthor({authors, timePeriods}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, initialValues)

    const [message, setMessage] = useState({type: '', content: ''})

    const [loading, setLoading] = useState(false)

    const createAuthor = async () => {
        setLoading(true)

        const {data: {author}, status} = await axios({
            method: 'POST',
            url: '/api/author',
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

        setMessage({type: 'success', content: 'Author Created'})
        valuesDispatch({type: 'CLEAR_VALUES', payload: {}})
        mutate('/api/author', [...authors, author], false)
    }

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    New Author
                </Typography>
            </Box>
            <Box mt={3}>
                <AuthorForm values={values} valuesDispatch={valuesDispatch} timePeriods={timePeriods} />
            </Box>
            <Box mt={3}>
                <SuccessButton disabled={loading} onClick={() => createAuthor()} variant="outlined">
                    Create Author
                </SuccessButton>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}