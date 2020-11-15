import {Paper, Box, Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Dispatch, useState, useReducer, useMemo} from 'react'
import {ClientBook} from '../../database/dbInterfaces'
import PassageForm from './PassageForm'
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
    books: ClientBook[];
    passageIndex: number;
    passages: any;
}

export default function ModifyPassage({books, passageIndex, passages}:Props) {

    const [values, valuesDispatch] = useReducer(valuesReducer, passages[passageIndex])

    const [message, setMessage] = useState({type: '', content: ''})

    useMemo(() => {
        valuesDispatch({type: 'CHANGE_INITIAL_VALUES', payload: passages[passageIndex]})
    }, [passages, passageIndex])

    const [loading, setLoading] = useState(false)

    const updatePassage = async () => {
        setLoading(true)

        const valueCopy = {...values}
        delete valueCopy._id

        try {
            await axios({
                method: 'POST',
                url: '/api/passage',
                data: {
                    operation: 'modify',
                    values: valueCopy,
                    id: values._id
                }
            })
        } catch(e) {
            setLoading(false)
            setMessage({type: 'error', content: 'Error Saving'})
            return
        }

        setLoading(false)

        setMessage({type: 'success', content: 'Changes Saved'})
        const passagesCopy = [...passages]
        passagesCopy[passageIndex] = values

        mutate('/api/passage', passagesCopy, false)
    }

    const deletePassage = async () => {
        setLoading(true)

        const confirmedDelete = confirm(`Are you sure you want to delete ${values.name}?`)

        if(!confirmedDelete) {
            setLoading(false)
            return
        }

        try {
            await axios({
                method: 'POST',
                url: '/api/passage',
                data: {
                    operation: 'delete',
                    id: values._id
                }
            })
        } catch(e) {
            setLoading(false)
            setMessage({type: 'error', content: 'Error deleting'})
            return
        }

        setLoading(false)

        setMessage({type: 'success', content: 'Passage Deleted'})

        valuesDispatch({type: 'CLEAR_VALUES', payload: {}})

        const passagesCopy = [...passages]
        passagesCopy.splice(passageIndex, 1)

        mutate('/api/passage', passagesCopy, false)
    }

    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography variant="h5">
                    Modify Passage
                </Typography>
            </Box>
            <Box mt={3}>
                <PassageForm values={values} valuesDispatch={valuesDispatch} books={books} />
            </Box>
            <Box mt={3}>
                <Grid container spacing={3}>
                    <Grid item>
                        <SuccessButton disabled={loading} onClick={() => updatePassage()} variant="outlined">
                            Update
                        </SuccessButton>
                    </Grid>
                    <Grid item>
                        <ErrorButton disabled={loading} variant="outlined" onClick={() => deletePassage()}>
                            Delete
                        </ErrorButton>
                    </Grid>
                </Grid>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </Paper>
    )
}