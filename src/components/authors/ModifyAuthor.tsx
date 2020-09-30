import {Paper, Box, Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer, useMemo} from 'react'
import {ClientTimePeriod} from '../../database/dbInterfaces'
import AuthorForm from './AuthorForm'
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
    authors: any;
    authorIndex: number;
    timePeriods: ClientTimePeriod[];
}

export default function ModifyAuthor({authors, authorIndex, timePeriods}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, authors[authorIndex])

    const [message, setMessage] = useState({type: '', content: ''})

    useMemo(() => {
        valuesDispatch({type: 'CHANGE_INITIAL_VALUES', payload: authors[authorIndex]})
    }, [authors, authorIndex])

    const [loading, setLoading] = useState(false)

    const updateAuthor = async () => {
        setLoading(true)

        const valueCopy = {...values}
        delete valueCopy._id

        const {status} = await axios({
            method: 'POST',
            url: '/api/author',
            data: {
                operation: 'modify',
                values: valueCopy,
                id: values._id
            }
        })

        setLoading(false)

        if(status !== 200) {
            setMessage({type: 'error', content: 'Error Saving'})
            return
        }
        setMessage({type: 'success', content: 'Changes Saved'})
        const authorsCopy = [...authors]
        authorsCopy[authorIndex] = values

        mutate('/api/author', authorsCopy, false)
    }

    const deleteAuthor = async () => {
        setLoading(true)

        const confirmedDelete = confirm(`Are you sure you want to delete ${values.firstName} ${values.lastName}?`)

        if(!confirmedDelete) {
            setLoading(false)
            return
        }

        const {status} = await axios({
            method: 'POST',
            url: '/api/author',
            data: {
                operation: 'delete',
                id: values._id
            }
        })

        setLoading(false)

        if(status !== 200) {
            setMessage({type: 'error', content: 'Error deleting'})
            return
        }
        setMessage({type: 'success', content: 'Author Deleted'})

        valuesDispatch({type: 'CLEAR_VALUES', payload: {}})

        const authorsCopy = [...authors]
        authorsCopy.splice(authorIndex, 1)

        mutate('/api/author', authorsCopy, false)
    }

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    Modify Author
                </Typography>
            </Box>
            <Box mt={3}>
                <AuthorForm values={values} valuesDispatch={valuesDispatch} timePeriods={timePeriods} />
            </Box>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton disabled={loading} onClick={() => updateAuthor()} variant="outlined">
                            Update
                        </SuccessButton>
                    </Grid>
                    <Grid item>
                        <ErrorButton disabled={loading} variant="outlined" onClick={() => deleteAuthor()}>
                            Delete
                        </ErrorButton>
                    </Grid>
                </Grid>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}